#include <stdio.h>

typedef struct test
{
    int x;
    int y;
    int correct;
} test_t;

void test(int (*function)(int, int))
{
    test_t tests[] = {
        {5, 10, 10},
        {5, -10, 5},
        {-5, 10, 10},
        {2, 2, 2},
        {-2, -4, -2}};

    printf("\n|%s|%s|%s|\n", "---------------", "----------------", "-------------");
    printf("| %-13s | %-14s | %-11s |\n", "Function Call", "Correct Result", "Your Result");
    printf("|%s|%s|%s|\n", "---------------", "----------------", "-------------");

    int failures = 0;
    int num_tests = sizeof(tests) / sizeof(tests[0]);

    for (int i = 0; i < num_tests; i++)
    {
        char args[20]; // Allocate enough space for the formatted string
        snprintf(args, sizeof(args), "max(%d, %d)", tests[i].x, tests[i].y);
        int result = function(tests[i].x, tests[i].y);

        if (function(tests[i].x, tests[i].y) == tests[i].correct)
        {
            printf("| %-13s | %14d | \033[32m%11d \033[0m|\n", args, tests[i].correct, result);
        }
        else
        {
            printf("| %-13s | %14d | \033[31m%11d \033[0m|\n", args, tests[i].correct, result);
            failures++;
        }
    }
    printf("|%s|%s|%s|\n", "---------------", "----------------", "-------------");

    if (failures == 0)
    {
        printf("\n\033[32m All Tests Passed \033[0m\n\n");
    }
    else
    {
        printf("\n\033[31m %d Tests Failed \033[0m\n\n", failures);
    }
}
