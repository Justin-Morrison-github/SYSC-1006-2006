// test.h
#ifndef TEST_H
#define TEST_H

typedef struct test
{
    int x;
    int y;
    int correct;
} test_t;

void test(int (*function)(int, int));

#endif