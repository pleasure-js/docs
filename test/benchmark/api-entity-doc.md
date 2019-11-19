# Admin
> Inherits [User]()

The Admin entity is meant to store user-level blah blah.

## Properties

| Property | Type | Unique | Index | Default | Virtual | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| phoneNumber (*) | [String]() | √ | √ | The administrator phone number |

## Methods

- [.login()]()
- [.signUp()]()

### .login() `[POST]` [AdminCredentials]() `/admin/login` => [AuthenticationTokens]()

Login an admin in the system

#### Data => [AuthenticationTokens]()
#### Return => [AuthenticationTokens]()
#### Throws

 => [AuthenticationTokens]()

| Name | Type | Description |
| :--- | :--- | :--- |
| nombre | String | Name of the person |

## Endpoints

Overview of all endpoints the entity populates

| URL | Method | Data | Returns | Description |
| :--- | :--- | :--- | :--- | :--- |
| /papo | POST | [AuthenticationCredentials]() | []() | Well |
| /papo | GET | []() | []() | Well |

Virtual properties are calculations

## \[POST\] /papo


