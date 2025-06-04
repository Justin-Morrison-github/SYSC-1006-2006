<title>
Course Overview
</title>

<strong>This text is important!</strong>

<i>This text is italic</i>

<em>This text is emphasized</em>

<small>This is some smaller text.</small>

<p>Do not forget to buy <mark>milk</mark> today.</p>

<p>My favorite color is <del>blue</del> red.</p>

<p>My favorite color is <del>blue</del> <ins>red</ins>.</p>

<p>This is <sub>subscripted</sub> text.</p>

<p>This is <sup>superscripted</sup> text.</p>


The general idea of this project is to mostly mirror what you are seeing in lectures, but in a more condensed and more personalized to what I think is important. I have also embedded a few interactive elements into the lecture notes. This is pop-quiz style question you may see in the notes.

<Quiz title="2.1" question="Is this valid C code?" options="{True:'No, there are no semicolons', False:'Correct!'}" correct="False">

```c
int x = 5
printf("%d\n", x)
```

</Quiz>

<br>

Or maybe a drop down quiz like this. Click the arrow to collapse/expand the element:



<DropQuiz title="Quiz" question="Which of loops is *not* supported by C" options="{for:'Incorrect', while:'Incorrect', foreach:'Correct', 'do while':'Incorrect'}" correct="foreach" hint="Does C let you loop over a list like python (for x in ___)?">
</DropQuiz>


## Information

I have made custom elements to convey a certain meaning.

<br>

If there is a piece of information I think is important or is nuanced it will be in this **important** block.

<warning title="Important">
    </div>
        Remember to add semicolons at that end of each statement in C.
    </div>
</warning>

<br>

If there is anything that needs a warning, such as a piece of code that if typed incorrectly can cause major issues I will try to add a **Warning** block with that information.

<warning>
    </div>
        Remember to add semicolons at that end of each statement in C.
    </div>
</warning>

<br>


If I introduce a word/phrase/concept for the first time I will try to include a **definition** block that looks something like this:

<definition title="Definition">
    <div>
        The defintion of...
    </div>
</definition>

<br>

Anything I find interesting, any external resources, or just comments about the course content will be put in this **info** block like this:

<info>
    </div>
        Funnily enough, after I began making this website I found another website (<a href="https://www.learn-c.org/">Learn-C.org</a>) that does almost the exact same thing. It's uncanny how similar it is. It seems like its an open-source, community driven project that supports more languages than just C. I encourage you to check them out if you want a second opinion, more exercises, or just more information on C, it looks like a great resource.
    </div>
</info>


