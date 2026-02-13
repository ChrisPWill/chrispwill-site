{
  description = "11ty Blog";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    devshell.url = "github:numtide/devshell";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    devshell,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: {
      devShell = let
        overlays = [devshell.overlays.default];
        pkgs = import nixpkgs {
          inherit system overlays;
        };
      in
        pkgs.devshell.mkShell {imports = [(pkgs.devshell.importTOML ./devshell.toml)];};
    });
}
