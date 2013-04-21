# WordPress Bootstrap #

This is a basic bootstrap to develop WordPress plugins using **Grunt**, **Compass**, **GIT** and **SVN**.

You will use your GIT repository as plugin development environment and the WordPress plugin repository as production environment.

Being possible to run commands with the Grunt to deploy its new versions.

## Requirements: ##

* [Node.js](http://nodejs.org/)
* [Compass](http://compass-style.org/)
* [GIT](http://git-scm.com/)
* [Subversion](http://subversion.apache.org/)

## Installation: ##

Clone this repo:

    $ git clone git@github.com:claudiosmweb/wordpress-plugin-bootstrap.git

Install the dependencies of the grunt:

    $ sudo npm install

Finally rename the files as you want and create your GIT repository.

## Commands: ##

Lint and compress the files:

    $ grunt default

Watch the project:

    $ grunt watch

Deploy with svn:

    $ grunt deploy

## License: ##

WordPress Plugin Bootstrap is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

WordPress Plugin Bootstrap is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License in <http://www.gnu.org/licenses/>.
