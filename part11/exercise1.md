# Exercice 11.1

> ** 11.1 Warming up **
> 
> Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.
>
> Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.
>
>Write a short text, say 200-300 words, where you answer or discuss some of the points below. You can check the length with https://wordcounter.net/. Save your answer to the file named exercise1.md in the root of the repository that you shall create in exercise 11.2.
>
>The points to discuss:
>
>- Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.
>- What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!
>- Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?
>
> Remember that there are no 'right' answers to the above!

Let us assume that our team is creating a basic calculator app coded with Python. Our task consist in writing simple math functions to add, substract, multiply, and divide. Our focus here is adding new functionalities to the app, continuous integration, so we want to focus in internalizing the steps of building a pipeline, instead of writing Python code.

First, we log in to GitHub, create a new repository called `CalculatorApp` and clone it to our local. For others (and the CI server) to replicate our working conditions, we need to set up an environment. Once we've created and activated a [virtual environment](https://virtualenv.pypa.io), we create a new file called `calculator.py` in the root directory, write some code in it and commit the changes.

The next step is adding tests to make sure our code works the way it's supposed to. We will test out code in two steps. The first step involves linting. [flake8](https://flake8.pycqa.org) is commonly used to check if your code conforms to the standard Python coding style.

The second step is unit testing. A unit test is designed to check a single function, or unit, of code. Python comes with a standard unit testing library, but other libraries exist and are very popular. For example, [pytest](https://docs.pytest.org).

At last, we are ready to set up our continuous integration pipeline! For this project, we'll use a cloud-based environment (e.g [GitHub Actions](https://github.com/features/actions), because it's a small project that doesn't have any special requirements. The configuration is simple than a self-hosted solution (e.g. [Jenkins](https://www.jenkins.io/) and we don't need to go to the hassle or expense of setting up our own system.

Finally, it's worth mention that there exist a lot of alternatives to set up the CI besides Jenkins and GitHub Actions. Here we mention 5 of it, for the sake of simplicity: [GitLab CI/CD](https://docs.gitlab.com/ee/ci/), [Bamboo](https://www.atlassian.com/software/bamboo), [CircleCI](https://circleci.com), [TeamCity](https://www.jetbrains.com/teamcity/), and [Travis CI](https://travis-ci.org/).