@loan
Feature: Loan management

  Background: User is logged in
    Given I am logged in to Mifos web app
    And I create and activate a client

  Scenario: Create a loan
    When I create a loan
    Then loan should be created successfully
