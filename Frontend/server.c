/*
** server.c -- a stream socket server demo
*/

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#include <sys/wait.h>
#include <signal.h>
#include <time.h>

#define BACKLOG 10	 // how many pending connections queue will hold

struct data {
   char * response;
	 long length;
	 int status;
};

struct request {
	int type;
	char * fileData;
	int fileLength;
	char * path;
};

void sigchld_handler(int s)
{
	(void)s; // quiet unused variable warning

	// waitpid() might overwrite errno, so we save and restore it:
	int saved_errno = errno;

	while(waitpid(-1, NULL, WNOHANG) > 0);

	errno = saved_errno;
}


// get sockaddr, IPv4 or IPv6:
void *get_in_addr(struct sockaddr *sa)
{
	if (sa->sa_family == AF_INET) {
		return &(((struct sockaddr_in*)sa)->sin_addr);
	}

	return &(((struct sockaddr_in6*)sa)->sin6_addr);
}

struct data getDataFromFile(char * path) {
	struct data dataResponse;
	FILE *fp;
	long lSize;
	char * buffer;
  long result;

	fp = fopen(path, "r");
	if (fp==NULL) {
		fp = fopen("not found.html", "r");
		dataResponse.status = 404;
  } else {
		dataResponse.status = 200;
	}
	fseek (fp , 0 , SEEK_END);
  lSize = ftell (fp);
  rewind (fp);
	
	buffer = (char*) malloc (sizeof(char)*lSize);
  if (buffer == NULL) {
		fputs ("Memory error",stderr);
		exit (2);
	}

	result = fread (buffer,1,lSize,fp);
  if (result != lSize) {fputs ("Reading error",stderr); exit (3);}
	fclose(fp);
	dataResponse.length = result;
	dataResponse.response = buffer;
	return dataResponse;
}

void writeFile(struct request fileData) {
	FILE *fptr;
	if ((fptr = fopen(fileData.path, "wb")) == NULL){
			printf("Error! opening file");
			// Program exits if the file pointer returns NULL.
			exit(1);
	}
	
	fwrite(fileData.fileData, fileData.fileLength, 1, fptr);
	fclose(fptr);
}

struct data getResponse(struct request requestData) {
	if(requestData.type == 1) {
		writeFile(requestData);
		// printf("%s\n", requestData.fileData);
		struct data result;
		int totalLength = strlen("HTTP/1.1 200 OK\r\n\r\n") + 1;
		result.response = malloc(totalLength);
		strcpy(result.response, "HTTP/1.1 200 OK\r\n\r\n");
		*(result.response+totalLength-1) = 0;
		result.length = totalLength;
		return result;
	}
	struct data result;
	struct data responseData = getDataFromFile(requestData.path);
	char * responseStatus;
	if(responseData.status == 404) {
		responseStatus = malloc(strlen("HTTP/1.1 404 Not Found\r\n\r\n"));
		strcpy(responseStatus, "HTTP/1.1 404 Not Found\r\n\r\n");
	} else {
		responseStatus = malloc(strlen("HTTP/1.1 200 OK\r\n\r\n"));
		strcpy(responseStatus, "HTTP/1.1 200 OK\r\n\r\n");
	}

	long totalLength = strlen(responseStatus) + responseData.length + 1;
	result.length = totalLength;
	char * response;
	response = malloc(totalLength);
	strcpy(response, responseStatus);
	int index = strlen(responseStatus);
	for(int i = 0; i < responseData.length; i++) {
		*(response+i+index) = *(responseData.response+i);
	}
	*(response+totalLength-1) = 0;
	result.response = response;
	return result;
}

void str_replace(char *target, const char *needle, const char *replacement)
{
    char buffer[1024] = { 0 };
    char *insert_point = &buffer[0];
    const char *tmp = target;
    size_t needle_len = strlen(needle);
    size_t repl_len = strlen(replacement);

    while (1) {
        const char *p = strstr(tmp, needle);

        // walked past last occurrence of needle; copy remaining part
        if (p == NULL) {
            strcpy(insert_point, tmp);
            break;
        }

        // copy part before needle
        memcpy(insert_point, tmp, p - tmp);
        insert_point += p - tmp;

        // copy replacement string
        memcpy(insert_point, replacement, repl_len);
        insert_point += repl_len;

        // adjust pointers, move on
        tmp = p + needle_len;
    }

    // write altered string back to target
    strcpy(target, buffer);
}

int main(int argc, char *argv[])
{
	if (argc != 2) {
	    fprintf(stderr,"usage: port_number\n");
	    exit(1);
	}

	int sockfd, new_fd;  // listen on sock_fd, new connection on new_fd
	struct addrinfo hints, *servinfo, *p;
	struct sockaddr_storage their_addr; // connector's address information
	socklen_t sin_size;
	struct sigaction sa;
	int yes=1;
	char s[INET6_ADDRSTRLEN];
	int rv;

	memset(&hints, 0, sizeof hints);
	hints.ai_family = AF_UNSPEC;
	hints.ai_socktype = SOCK_STREAM;
	hints.ai_flags = AI_PASSIVE; // use my IP

	if ((rv = getaddrinfo(NULL, argv[1], &hints, &servinfo)) != 0) {
		fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(rv));
		return 1;
	}

	// loop through all the results and bind to the first we can
	for(p = servinfo; p != NULL; p = p->ai_next) {
		if ((sockfd = socket(p->ai_family, p->ai_socktype,
				p->ai_protocol)) == -1) {
			perror("server: socket");
			continue;
		}

		if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &yes,
				sizeof(int)) == -1) {
			perror("setsockopt");
			exit(1);
		}

		if (bind(sockfd, p->ai_addr, p->ai_addrlen) == -1) {
			close(sockfd);
			perror("server: bind");
			continue;
		}

		break;
	}

	freeaddrinfo(servinfo); // all done with this structure

	if (p == NULL)  {
		fprintf(stderr, "server: failed to bind\n");
		exit(1);
	}

	if (listen(sockfd, BACKLOG) == -1) {
		perror("listen");
		exit(1);
	}

	sa.sa_handler = sigchld_handler; // reap all dead processes
	sigemptyset(&sa.sa_mask);
	sa.sa_flags = SA_RESTART;
	if (sigaction(SIGCHLD, &sa, NULL) == -1) {
		perror("sigaction");
		exit(1);
	}

	printf("server: waiting for connections...\n");

	while(1) {  // main accept() loop
		sin_size = sizeof their_addr;
		new_fd = accept(sockfd, (struct sockaddr *)&their_addr, &sin_size);
		if (new_fd == -1) {
			perror("accept");
			continue;
		}

    char buffer[1000000] = {0};
		int reqLen = read(new_fd, buffer, 1000000);
    printf("%s\n", buffer);
		int flag = 0;
		int startIndex = 0;
		struct request requestData;

		for(int i = 0; i < 1000000; i++) {
			if(buffer[i] == ' ' || buffer[i] == '\n' || buffer[i] == 0) {
				buffer[i] = 0;
				if(flag == 0) {
					if(strcmp(&buffer[startIndex], "GET") == 0) {
						requestData.type = 0;
					} else if(strcmp(&buffer[startIndex], "POST") == 0) {
						requestData.type = 1;
					} else {
						flag = 2;
						break;
					}
					flag = 1;
				} else if(flag == 1) {
					requestData.path = &buffer[startIndex+1];
					str_replace(requestData.path, "%20", " ");
					if(requestData.type == 1) {
						requestData.fileData = &buffer[i+1];
						requestData.fileLength = reqLen - (i+2);
						printf("%d\n", requestData.fileLength);
					}
					break;
				}
				startIndex = i+1;
			}
		}

		printf("%s\n", requestData.path);

		inet_ntop(their_addr.ss_family,
			get_in_addr((struct sockaddr *)&their_addr),
			s, sizeof s);
		printf("server: got connection from %s\n", s);

		if (!fork()) { // this is the child process
			close(sockfd); // child doesn't need the listener
			struct data sendb = getResponse(requestData);
			if(flag != 2) {
				if (send(new_fd, sendb.response, sendb.length-1, 0) == -1)
					perror("send");
			} else {
				if (send(new_fd, "Invalid Request", 15, 0) == -1)
					perror("send");
			}
			close(new_fd);
			exit(0);
		}
		close(new_fd);  // parent doesn't need this
	}

	return 0;
}