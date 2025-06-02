#include <stdio.h>
#include <assert.h>
#include "test.h"

int max(int x, int y)
{
    if (x > y)
    {
        return x;
    }
    else
    {
        return y;
    }
}

int main(int argc, char const *argv[])
{
    test(max);
    return 0;
}
