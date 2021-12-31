cmake_minimum_required(VERSION 3.10)
set(CMAKE_VERBOSE_MAKEFILE ON)
project(GomokuCore VERSION 0.1.0)
set(CXX_STANDARD 17)

# build type
if(NOT CMAKE_BUILD_TYPE)
    message(STATUS "No build type selected, default to Release")
    set(CMAKE_BUILD_TYPE "Release")
endif()

# For git users, attempt to generate a more useful version string
if(EXISTS ${CMAKE_CURRENT_SOURCE_DIR}/.git)
    find_package(Git QUIET REQUIRED)
    execute_process(
        COMMAND 
            "${GIT_EXECUTABLE}" --git-dir=${CMAKE_CURRENT_SOURCE_DIR}/.git describe --tags --match version_*
        RESULT_VARIABLE
            GIT_VERSION_RESULT
        OUTPUT_VARIABLE
            GIT_VERSION
        OUTPUT_STRIP_TRAILING_WHITESPACE
    )
    if(${GIT_VERSION_RESULT})
        message(WARNING "Error running git describe to determine version")
    else()
        set(PROJECT_VERSION "${PROJECT_VERSION} (${GIT_VERSION})")
    endif()
endif()

# Supportive functionality ----------------------------------------------------
function(add_cxx_flag value)
    message(STATUS "Building with ${value}")
    set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${value}" PARENT_SCOPE)
endfunction()

# compile flags
function(add_compile_flag value)
    message(STATUS "Building with ${value}")
    foreach(variable CMAKE_C_FLAGS CMAKE_CXX_FLAGS)
        set(${variable} "${${variable}} ${value}" PARENT_SCOPE)
    endforeach(variable)
endfunction()

# debug build
set(CMAKE_C_FLAGS_DEBUG "")
set(CMAKE_CXX_FLAGS_DEBUG "")
function(add_debug_compile_flag value)
    if("${CMAKE_BUILD_TYPE}" MATCHES "DEBUG")
        message(STATUS "Building with ${value}")
    endif()
    foreach(variable CMAKE_C_FLAGS_DEBUG CMAKE_CXX_FLAGS_DEBUG)
        set(${variable} "${${variable}} ${value}" PARENT_SCOPE)
    endforeach(variable)
endfunction()

# non-debug builds
set(CMAKE_C_FLAGS_RELEASE "")
set(CMAKE_CXX_FLAGS_RELEASE "")
function(add_nondebug_compile_flag value)
    if(NOT "${CMAKE_BUILD_TYPE}" MATCHES "DEBUG")
        message(STATUS "Building with ${value}")
    endif()
    foreach(variable CMAKE_C_FLAGS_RELEASE CMAKE_CXX_FLAGS_RELEASE)
        set(${variable} "${${variable}} ${value}" PARENT_SCOPE)
    endforeach(variable)
endfunction()

# linker flags
function(add_link_flag value)
    message(STATUS "Linking with ${value}")
    foreach(variable CMAKE_EXE_LINKER_FLAGS CMAKE_SHARED_LINKER_FLAGS)
        set(${variable} "${${variable}} ${value}" PARENT_SCOPE)
    endforeach(variable)
endfunction()

# Compiler setup --------------------------------------------------------------
include_directories(${PROJECT_SOURCE_DIR}/include)

# set(THREADS_PREFER_PTHREAD_FLAG ON)
# set(CMAKE_THREAD_PREFER_PTHREAD ON)
# find_package(Threads REQUIRED)
add_cxx_flag("-std=c++${CXX_STANDARD}")
# if(NOT EMSCRIPTEN)
#     if(CMAKE_SYSTEM_PROCESSOR MATCHES "^i.86$")
#     # wasm doesn't allow for x87 floating point math
#     add_compile_flag("-msse2")
#     add_compile_flag("-mfpmath=sse")
#     elseif(CMAKE_SYSTEM_PROCESSOR MATCHES "^armv[2-6]" AND NOT CMAKE_CXX_FLAGS MATCHES "-mfpu=")
#     add_compile_flag("-mfpu=vfpv3")
#     endif()
# endif()

add_compile_flag("-fPIC")
add_compile_flag("-Wall")
add_compile_flag("-Wextra")

add_debug_compile_flag("-O0")
add_debug_compile_flag("-g3")
add_debug_compile_flag("-Werror")
add_debug_compile_flag("-fsanitize=undefined")

add_nondebug_compile_flag("-O2")
# in opt builds, LTO helps so much (>20%) it's worth slow compile times
# add_nondebug_compile_flag("-flto")
add_nondebug_compile_flag("-fno-rtti -DEMSCRIPTEN_HAS_UNBOUND_TYPE_NAMES=0")
add_nondebug_compile_flag("-fno-exceptions -s DISABLE_EXCEPTION_CATCHING=1")

# embind
add_link_flag("--bind")
# no main function
add_link_flag("--no-entry")
# link static library
add_link_flag("--whole-archive")
# only output js
add_link_flag("-s SINGLE_FILE")
# heap memory growthable
add_link_flag("-s ALLOW_MEMORY_GROWTH=1")
# critical for react, only working with these flags
add_link_flag("-s ENVIRONMENT=web")
add_link_flag("-s MODULARIZE=1")

# clang doesn't print colored diagnostics when invoked from Ninja
# if(UNIX AND CMAKE_GENERATOR STREQUAL "Ninja")
#     if(CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
#         add_compile_flag("-fdiagnostics-color=always")
#     elseif(CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
#         add_compile_flag("-fcolor-diagnostics")
#     endif()
# endif()


# Targets ---------------------------------------------------------------------
add_library(${PROJECT_NAME} STATIC src/GomokuCore.cc src/GomokuCoreAgent.cc)

add_executable(WasmModule src/embind.cc)
target_link_libraries(WasmModule ${PROJECT_NAME})
# set_target_properties(WasmModule PROPERTIES SUFFIX ".wasm")
