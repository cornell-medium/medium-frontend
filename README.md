# Medium Design Collective Web App
## Front-end Repository

This is the repository containing only the static components of the Medium web app. These components are primarily built using HTML, Sass, and JavaScript. The backend of the app is built in Django - for more info please visit the backend repository: [Medium Backend](https://github.com/cornell-medium/django-backend)

## Our Approach to Front-end Design and Coding

Less is more. Use the fewest components possible while still conveying ideas effectively. A user should be able to find what they are looking for, anywhere on the site, in less than a minute.

## Requirements

The only requirement for development in this repository is Sass-to-CSS processor. It is recommended to install Sass as a Ruby gem: before continuing, please ensure that Ruby and its package manager have been installed successfully by running:

```
gem -v
```

Next, install the Ruby gem by running:

```
gem install sass
```

Sass should now be installed on your system. You can verify this by running:

```
sass -v
```

## Development Environment Setup

It is important to setup the project backend before cloning this repository and beginning front-end development. For detailed installation and setup instructions, please visit the backend repository: [Medium Backend](https://github.com/cornell-medium/django-backend)

Once the Django server is running, launch the Sass processor in watch mode from the root folder of this repository by running:

```
sass --watch scss:css
```

**Ensure you are in the static submodule of the backend repository.** If you have just cloned the backend, or see that the static directory is empty, run `git submodule update --init --recursive` from the root of the backend repo.

## Project Structure

The structure presented here is meant to serve as a guide for how the project is organized, and keep the project as easy to understand as possible. It is not a mirror image of the project, nor show all of the project's contents.

```
.
├── html                        # HTML templates for the app (with Python Jinja)
│   ├── sections                # Markup for independent app sections, separate app pages
│   │   ├── splash.html
│   │   └── events.html
│   └── components              # Markup for reusable app components, to be used across pages
│       └── nav.html
├── scss                        # Sass (stylesheets) for the app
|   ├── style.scss              # Import file for all .scss files
│   ├── base.scss               # Gathering point for universal app styles
│   ├── sections                # Styles for independent app sections
│   │   ├── splash.scss
│   │   └── events.scss
│   ├── components              # Styles for reusable app components
│   │   └── nav.scss
│   └── utilities               # Sass variables that are used throughout the app
│       ├── colors.scss
│       ├── fonts.scss
│       └── variables.scss
├── js                          # JavaScript code for the app
│   ├── index.js                # Gathering for universal script components
│   ├── sections                # Scripts for independent app sections
│   │   ├── splash.js
│   │   └── events.js
│   ├── components              # Scripts for reusable app components
│   │   └── nav.js
│   └── vendor                  # Scripts developed by outside sources
│       └── jquery-3.1.1.min.js
├── imgs                        # Image resources used by the app
│   ├── sections                # Images for independent app sections
│   │   └── splash              # Images for a specific section
│   │   │   └── img.jpg
│   │   └── events
│   │   │   └── img.jpg
│   └── components              # Images for reusable app components
│       └── nav
│           └── img.jpg
└── fonts                       # Fonts used by the app
```

## Adding a New Section

* _HTML_: Should be in `html/sections`. Import all necessary styles and components by beginning the file with `{% extends "components/base.html" %}`. Wrap all content with `{% block content %}` and `{% endblock %}`.
* _SCSS_: Add your `.scss` file to `scss/sections` and make sure the name is prefixed with an underscore. Under "Import specific page styles" in `style.scss`, add `@import './sections/<pagename>'`. The underscore is not necessary.

## Contribution Guidelines

A few rules-of-thumb for contributing to this project.

### Using Git

Git is life. It can make your development experience bliss if used correctly. It can also make your fellow project members hate you if used poorly. Please follow these guidelines:

* Don't make a branch if somebody else has already opened a branch for the same thing.
* Never push to `master`. Always develop in a topic branch and merge into `master` using a pull request (see below).
* Always squash commits when merging to master. This helps to keep the project timeline clean and organized.
* Always used pull requests when merging to master. When the work in a branch is considered done, open a pull request and recieve approval from at least one other reviewer before merging.
* Always delete old branches. Once a branch is merged, delete it.

### Commit Messages

A commit message should be short and sweet, but also descriptive. "I added some UI stuff" will not help a developer down the road trying to figure out where a bug cropped up.

### Variable Naming

Variable naming should remain consistent throughout the project, although naming conventions vary somewhat between languages:

* _HTML_: class names should be separated by a single - character, e.g. `my-variable`
* _Sass_: variables should be separated by a single - character, e.g. `my-variable`
* _JavaScript_: variables should use camelcase, e.g. `myVariable`
* _Directories_: directories should be seperated by a single _ character, e.g. `my_directory`

### Sass File Structure

_External file structure_: the `style.scss` file serves only as a location to import all other `scss` files. This way, only a single `scss` file needs to be loaded in each `HTML` page. Stylesheets should be organized with the same directory structure as their respective `HTML` template.

_Internal file structure_: one of the major benefit of Sass is the ability to write clearer, more readable stylesheets. Use variables wherever possible, and always defer to using a variable already created in the app: margins, padding, animations and colors should only be defined using variables. Elements within each stylesheet should be organized as children of their parents component. This gives a clear hierarchy of how elements are organized on the page.
