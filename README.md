# FBI Most Wanted

A web application that fetches and displays the FBI's Most Wanted fugitives list using the FBI API.

## Features
- Fetches real-time data from the FBI's public API
- Displays a list of fugitives with images and details
- Search functionality to filter fugitives by name or alias
- Responsive UI for both mobile and desktop users

## Technologies Used
- **React.js** - Frontend framework
- **TypeScript** - Type safety and improved development experience
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling and UI layout
- **Axios** - API requests handling
- **Vite** - Development and build tool for faster performance
- **PostgreSQL** - Database for backend storage

## Installation

To run the application using Docker, follow these steps:
1. Clone the repository:
   ```sh
   git clone https://github.com/g90tony/fbi-most-wanted.git
   ```
2. Navigate to the project folder:
   ```sh
   cd fbi-most-wanted
   ```
3. Ensure you have **Docker** and **Docker Compose** installed.
4. In the project root directory, run the following command:
   ```sh
   docker compose up --build
   ```
5. The application should now be accessible at `http://localhost:5431` for the database `http://localhost:5000` for the API and `http://localhost:3000` for the web app.

## Usage
- Browse through the list of most wanted fugitives.
- Use the search bar to filter fugitives by name or alias.
- Click on a fugitive's card to see more details.

## API Reference
This project uses the **FBI Most Wanted API**:
- API Documentation: [https://www.fbi.gov/wanted/api](https://www.fbi.gov/wanted/api)
- Example Endpoint:
  ```sh
  https://api.fbi.gov/wanted/v1/list
  ```

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For questions or collaboration, reach out via:
- GitHub: [g90tony](https://github.com/g90tony)
- Email: [calebmbugua@gmail.com](mailto://calebmbugua@gmail.com)

