cmake_minimum_required(VERSION 3.10)
project(GomokuCore VERSION 0.1.0)

include_directories(${PROJECT_SOURCE_DIR}/include)

add_library(${PROJECT_NAME} src/GomokuCore.cc)

add_executable(main src/main.cc)
target_link_libraries(main ${PROJECT_NAME})

set(CPACK_PROJECT_NAME ${PROJECT_NAME})
set(CPACK_PROJECT_VERSION ${PROJECT_VERSION})
include(CPack)
