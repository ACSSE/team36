In general, for the sake of consistency, for every function please try to stick to the following guidelines:

1   Create a log entry when the function is called to indicate the fact.
2   Check that parameters passed are of the correct type.
3   Log any errors that are detectable and predictable (incorrect parameters passed, etc.).
4   Log the successful completion of the function.
5   Comment the function:
5.1 In the comments at the top of a function, state its purpose, give an example of its use and put your student number as the author.
5.2 If you have used variable names and functions that do not lend themselves to easy interpretation, please add some commenting
    at the applicable section of code.
5.3 If your code is inspired by some source, other than the manual of a language, rather reference it as a source in
    the commenting at the top for safety's sake. That way, plagiarism becomes less of a concern.
6   I will elaborate on this later, but it will be good if you can write test case for all the important functions that
    will carry the features of the site.

On the completion of any function in any of the applicable languages we will use (Javascript, PHP, Android, etc.), push
the completed function to the development branch of the project so that it is accessible to others. This should ensure
that we do not duplicate work and give each other an indication of progress.

The guidelines should ensure that debugging is less of a nightmare.

Goal:
$title = ...
include __DIR__."/PhpModules/openDocument.php"; - any initialisation code as well as opening <html> to opening <body> tag
//Content that would have been placed in the <body> tags goes between these two lines
//Consider putting the nav bar in a separate module that's loaded here
include __DIR__."/PhpModules/closeDocument.php"; - Foundation 6 required end script as well as closing </body></html>