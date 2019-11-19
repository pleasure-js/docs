Feature: Login Page

  Users must be able to access a login page where they can input
  their credentials (email or smeId, password and a DFA token) in order to access
  the application.

  @doc
  Scenario: Accessing the application
    Given A user who have not signed in
    When The user browses to the application
    Then The user must be taken to the login page
    And The Login Page must contain an email, password, and DFA inputs, as well as a 'login' submit button

  @doc
  Scenario: Newly registered user receives their initial credentials via e-mail
    Given A newly registered user credentials
    When The user clicks on the url provided via email
    And Login form is submitted using the user email or smeId and password received by email
    Then The user must be taken to the force change password page
    And The user won't be able to access other routes until changing its password and enabling DFA

  Scenario Outline: Add numbers
    Given a file named "main.py" with:
    """
    print(<x> + <y>)
    """
    When I successfully run `python3 main.py`
    Then the stdout should contain exactly "<z>"
    Examples:
      | x | y | z |
      | 1 | 2 | 3 |
      | 4 | 5 | 9 |
