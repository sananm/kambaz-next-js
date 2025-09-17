import Link from "next/link";

export default function Assignments() {
    return (
        <div id='wd-assignments'>
            <input placeholder='Search for Assignments' id='wd-search-assignment' />
            <button id='wd-add-assignment-group'>+ Group</button>
            <button id='wd-add-assignment'>+ Assignment</button>
            <h3 id='wd-assignments-title'>
                ASSIGNMENTS 40% of Total <button>+</button>
            </h3>
            <ul id='wd-assignment-list'>
                <li className='wd-assignment-list-item'>
                    <Link
                        href='/Courses/1234/Assignments/123'
                        className='wd-assignment-link'
                    >
                        A1 - ENV + HTML
                    </Link>
                    <p>
                        Multiple Modules | <strong>Not available until</strong> Sept 19 at
                        12:00am
                    </p>
                    <p>
                        <strong>Due</strong> Sept 26 at 11:59pm | 100 pts
                    </p>
                </li>
                <li className='wd-assignment-list-item'>
                    <Link
                        href='/Courses/1234/Assignments/123'
                        className='wd-assignment-link'
                    >
                        A2 - CSS + BOOTSTRAP
                    </Link>
                    <p>
                        Multiple Modules | <strong>Not available until</strong> Sept 26 at
                        12:00am
                    </p>
                    <p>
                        <strong>Due</strong> Oct 3 at 11:59pm | 100 pts
                    </p>
                </li>
                <li className='wd-assignment-list-item'>
                    <Link
                        href='/Courses/1234/Assignments/123'
                        className='wd-assignment-link'
                    >
                        A1 - ENV + HTML
                    </Link>
                    <p>
                        Multiple Modules | <strong>Not available until</strong> Oct 3 at
                        12:00am
                    </p>
                    <p>
                        <strong>Due</strong> Oct 10 at 11:59pm | 100 pts
                    </p>
                </li>
            </ul>
        </div>
    );
}
