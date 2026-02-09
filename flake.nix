{
  description = "11ty Blog (Pure Deno)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = with pkgs; [
          deno
          just # Command runner (easier than shell hooks)
        ];

        shellHook = ''
          echo "🦕 11ty + Deno environment loaded."
          echo "Run 'just' to see available commands."
        '';
      };
    });
}
