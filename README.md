# Harex - HAR Examiner

Harex is an open-source HAR (HTTP Archive) file examiner built with Next.js and Tailwind CSS. It allows you to easily analyze network requests and responses from HAR files with a modern, responsive interface.

![Harex Screenshot](https://github.com/charlesrhoward/harex/raw/main/public/screenshot.png)

## Features

- **Simple HAR file uploading**: Drag and drop or select HAR files to analyze
- **Detailed request/response inspection**: View URLs, headers, status codes, and bodies
- **Click-to-copy functionality**: Easily copy any part of a request or response with a single click
- **Dark mode support**: Toggle between light and dark themes
- **Filter and search**: Quickly find specific requests in large HAR files
- **Table sorting**: Sort requests by time, URL, status, or duration
- **Mobile responsive**: Works on devices of all sizes

## Getting Started

First, run the development server:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How to Use

1. Upload a HAR file using the drag-and-drop area or file selector
2. Browse through the list of network requests
3. Click on a request to view detailed information
4. Use the copy buttons to copy request/response data as needed
5. Use the filter box to search for specific requests

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev) - Beautiful, consistent icons
- [TypeScript](https://typescriptlang.org) - Type-safe JavaScript

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the application.

## Acknowledgments

- Inspired by various developer tools and HAR viewers
- Built with modern web technologies for a great user experience
