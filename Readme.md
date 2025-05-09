# ft_transcendence

`ft_transcendence` is a web-based application built as part of the 42 curriculum. It combines real-time features, user authentication, and interactive gameplay.


## Architecture
- **email_sender_service (ESS)**: sends email messages to users using templates  (announcements, otp codes and etc.).
- **user-management-service (UMS)**: handle and storage user data, provide an ability to sign in and sign up in the service in different ways.
- **frontendy (Frontend)**: give an ability to use service via UI.
- **radish (Cache)**: supportive key-value storage for all services.
- **db (Database)**: provides and keeps users data.

## How to Use
1. Clone repository :
```bash
git clone https://github.com/tmazitov/ft_transcendence.git
```

2. Create .env file in the root folder and fill it up following this structure :
```bash
# ESS - Email sender service
ESS_PORT=5000
ESS_EMAIL=example@gmail.co
ESS_PASS=password

# Radish - key-value storage for all services
RADISH_PORT=5100
```

3. Build service and run it :
```bash 
make build && make up
```

4. (Not necessary) For debugging use this command:
```bash
make up-logs
```

## License
This project is licensed under the MIT License.