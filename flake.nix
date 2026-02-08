{
  description = "11ty blog with Deno";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    utils,
    ...
  }:
    utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          deno
          # Any other tools like tailwindcss-language-server
        ];

        shellHook = ''
          echo "11ty + Deno dev environment loaded"
        '';
      };
    });
}
