default:
    @just --list

# Start the dev server
serve:
    deno task serve

# Build for production
build:
    deno task build

# Clean the output directory
clean:
    deno task clean
