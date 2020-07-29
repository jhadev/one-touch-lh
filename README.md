okkkkkkkk

# One Click Lighthouse Batch

## Description

A full stack application that will be used to run multiple Lighthouse reports with a single click. Ability to view all Lighthouse HTML reports from a single run and view an overview of scores for each report on main page. Currently, data is stored in JSON and HTML and is wiped before running a new batch.

![POC - UI](https://user-images.githubusercontent.com/42519030/88838956-4aed5480-d1a8-11ea-8452-7d4056542236.jpg)

## Dependencies

- express
- lighthouse-batch
- node-cmd
- serve-index

## User Story

As a user, I want to be able to run multiple Lighthouse reports with a single click rather than navigating to each individual url and running it from the browser

I want to be able to view the generated results from each report as well as a general overview of all reports

## Business Context

It is tedious to run multiple Lighthouse reports in the browser and adding a UI on top of an existing NPM package makes this process quicker and more organized
