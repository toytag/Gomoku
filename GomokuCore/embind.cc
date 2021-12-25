#include <emscripten/bind.h>
#include "GomokuCore.h"

// Binding code
using namespace emscripten;
EMSCRIPTEN_BINDINGS(my_module) {
    class_<MyClass>("MyClass")
        .constructor<int, std::string>()
        .function("incrementX", &MyClass::incrementX)
        .property("x", &MyClass::getX, &MyClass::setX)
        .property("y", &MyClass::getY, &MyClass::setY)
        .class_function("getStringFromInstance", &MyClass::getStringFromInstance);
}