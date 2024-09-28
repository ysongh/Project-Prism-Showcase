// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract UserProject {
  mapping(address => Project[]) public projects;

  struct Project{
    string cid;
    string url;
    address from;
  }

  constructor() {}

  function addProject(string memory _cid, string memory _url) external {
    projects[msg.sender].push(Project(_cid, _url, msg.sender));
  }

  function getProjects() external view returns (Project[] memory) {
    return projects[msg.sender];
  }
}