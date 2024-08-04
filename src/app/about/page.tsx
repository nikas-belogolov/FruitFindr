import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About FruitFindr",
};

export default function About() {


    return (
        <div style={{ padding: "3rem" }}>
            <h1>About FruitFindr</h1>
            <p>Welcome to <b>FruitFindr</b>!</p>
            <p>
                FruitFindr is a personal project created to showcase my skills in web development and geospatial data visualization. This web app helps users discover the locations of fruit trees in their area, promoting a connection with nature and encouraging the enjoyment of fresh, locally-grown fruit.
            </p>
            <h2>Project Overview</h2>
            <p><b>FruitFindr</b> utilizes modern web technologies to provide an intuitive and interactive map interface. Users can explore their surroundings and find various types of fruit trees, complete with detailed information about each tree, including the type of fruit and optimal harvesting times.</p>
            <h3>Features</h3>
            <ul style={{ listStyleType: "disc" }}>
                <li><b>Interactive Map</b>: An engaging map that shows the precise locations of fruit trees in the user's vicinity.</li>
                <li><b>Fruit Tree Details</b>: Information about each fruit tree, including fruit type and harvesting details.</li>
                <li><b>Community Contributions</b>: Users can add new fruit tree locations and share their knowledge with others.</li>
            </ul>
            <h3>Technology Stack</h3>
            <ul>
                <li><b>Frontend</b>: Developed using Next.js for a dynamic and responsive user interface.</li>
                <li><b>Backend</b>: Node.js and Next.js power the server-side logic and API endpoints.</li>
                <li><b>Database</b>: MongoDB is used for efficient storage and retrieval of geospatial data.</li>
                <li><b>Geospacial</b>: Leveraging MongoDB's geospatial queries and Leaflet with OpenStreetMap as the provider of the map tiles.</li>
            </ul>
            
            <p>You can explore more of my projects and connect with me on <Link href='https://github.com/nikas-belogolov'>GitHub</Link>.</p>
        </div>
    )
}