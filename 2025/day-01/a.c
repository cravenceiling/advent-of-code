#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv) {
  FILE *file = fopen(argv[1], "r");
  char buffer[1024];

  int dial = 50;
  int pass = 0;
  while (fgets(buffer, sizeof(buffer), file)) {
    char dir = buffer[0];
    int distance = atoi(buffer + 1);

    if (dir == 'R') {
      dial = (dial + distance) % 100;
    } else {
      dial = (dial - distance + 100) % 100;
    }

    if (dial == 0)
      pass++;
  }

  printf("password: %d\n", pass);

  return 0;
}
