# Creating a simple web application

## Features

* Create a singelton (app) structure to control the application - controller
  * method init - called on window load
  * public methods
    * setter methods
    * getter methods
  * private methods
  * public variables
  * private variables
  * event system
* Create a class alike function using the creational design pattern
  * treated as a view object
  * must have a constructor
  * must have template
  * must have a destroy method
  * event system

# The actual task

* web app representing an OS desktop
* create and destroy windows from the controller
* each window must have:
  * title
  * content
  * close button - destroys the window
  * minimize button - minimizes the window
  * maximize button - maximazes the application
  * representation in the bottom sidebar
  * template to be rendered with
  * unique ID
* public method exit - destroys all windows
* public method clean - minimizes active window
* only one window must be shown at a time
* create your own style and markup
