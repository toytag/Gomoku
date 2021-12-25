cmake_minimum_required(VERSION 3.10)
project(GomokuCore VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 17)
include_directories(${PROJECT_SOURCE_DIR}/include)

add_library(${PROJECT_NAME} STATIC src/GomokuCore.cc)

add_executable(Module src/embind.cc)
target_link_libraries(Module ${PROJECT_NAME})
set_target_properties(Module PROPERTIES SUFFIX ".js" LINK_FLAGS "-Oz --bind -s WASM=1")

# set(CPACK_PROJECT_NAME ${PROJECT_NAME})
# set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
# include(CPack)
