window.onload = function () {
    showProjects('java');
};

const apps = {
    java: [
        {
            name: "Weather Forecast",
            description: "Get accurate weather predictions for your location.",
            icon: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png",
            screenshots: [
                "https://picsum.photos/id/1018/1080/1920",
                "https://picsum.photos/id/1019/1080/1920",
                "https://picsum.photos/id/1020/1080/1920"
            ]
        },
        {
            name: "Language Learner",
            description: "Master new languages with interactive lessons and quizzes.",
            icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
            screenshots: [
                "https://picsum.photos/id/1021/1080/1920",
                "https://picsum.photos/id/1022/1080/1920",
                "https://picsum.photos/id/1023/1080/1920"
            ]
        },
        {
            name: "Meditation Guide",
            description: "Reduce stress and improve mindfulness with guided meditations.",
            icon: "https://cdn-icons-png.flaticon.com/512/3048/3048395.png",
            screenshots: [
                "https://picsum.photos/id/1024/1080/1920",
                "https://picsum.photos/id/1025/1080/1920",
                "https://picsum.photos/id/1026/1080/1920"
            ]
        },
        {
            name: "Recipe Finder",
            description: "Discover new recipes and cook delicious meals.",
            icon: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
            screenshots: [
                "https://picsum.photos/id/1027/1080/1920",
                "https://picsum.photos/id/1028/1080/1920",
                "https://picsum.photos/id/1029/1080/1920"
            ]
        },
        {
            name: "Travel Companion",
            description: "Plan your next trip with travel tips and recommendations.",
            icon: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
            screenshots: [
                "https://picsum.photos/id/1030/1080/1920",
                "https://picsum.photos/id/1031/1080/1920",
                "https://picsum.photos/id/1032/1080/1920"
            ]
        },

    ],
    kotlin: [
        {
            name: "Fitness Tracker",
            description: "Track your workouts and monitor your fitness progress.",
            icon: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/5pZMqQvKCUHkKDcCLvUwVXkKlxYT6MwjTwEVzOZWsIK71BnNzG6ncJvpOoG5-o_bOA=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/qH7Qy7QXbOiZxzYe5xQ1JhQknRYh7YKNBhsoDv4DaZEjQn_Vzc0sStLlqaRzUuVN1Sk=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/6Ql7zY9JdDOZdGvnQgVk4hTDzA4Xjt6ZyLtUU6xZVd_Ne3RVX7i_qmCiprX2zifvEw=w2560-h1440-rw"
            ]
        },
        {
            name: "Recipe Manager",
            description: "Organize your recipes and plan your meals.",
            icon: "https://cdn-icons-png.flaticon.com/512/1830/1830839.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/Xc9Xt3Xj6RXwXi-sCd8K4cKOZi2t6rvbBQwLTDWfJLGYBZGxQZWLvHhTsxBZZvzjOw=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/TFIkiY-2f7Hy8EvKHFjJKS8NNbONTT6bVjqMGx3_yvuVa8KIopNZ7M9qPe0FYGfKug=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/RL882h4cHHt1TlnvZeQUZGSXjO7-Hp3eg7TBYZNBVxFLwrGXZKA7X6WTdGMsKSXIHQ=w2560-h1440-rw"
            ]
        },
        {
            name: "Budget Planner",
            description: "Manage your finances and track your expenses.",
            icon: "https://cdn-icons-png.flaticon.com/512/2721/2721620.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/ixHXzBWPmmKWIBRmDlpBOTpebCZwzJzgJGYQhE-ZXfTTuHqUMKdNxoZr_kITvsw6XA=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/QvpVkFZV8qXVHhByJZwQEVJMnPSFqWCwkLBGZN7kZbKBqBXn9Zn7ztRyGDA6c3Yd=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/Rl-JZsNNwNzLCWP9MhYNWNPi7QWQmE6fGbgkYZGWRvN0YHdBQxmKc9TyQvt4lOYm1g=w2560-h1440-rw"
            ]
        }
    ],
    "react-native": [
        {
            name: "Fitness Tracker",
            description: "Track your workouts and monitor your fitness progress.",
            icon: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/5pZMqQvKCUHkKDcCLvUwVXkKlxYT6MwjTwEVzOZWsIK71BnNzG6ncJvpOoG5-o_bOA=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/5pZMqQvKCUHkKDcCLvUwVXkKlxYT6MwjTwEVzOZWsIK71BnNzG6ncJvpOoG5-o_bOA=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/5pZMqQvKCUHkKDcCLvUwVXkKlxYT6MwjTwEVzOZWsIK71BnNzG6ncJvpOoG5-o_bOA=w2560-h1440-rw"
            ]
        },
        {
            name: "Language Learning App",
            description: "Learn new languages with interactive lessons and quizzes.",
            icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/HVP0mBVzL1efzM1m3q3FIoSBjI9EOWaZ7NjZzONQtrGRRfkBWHCeX7fjOh7i8zeskg=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/HVP0mBVzL1efzM1m3q3FIoSBjI9EOWaZ7NjZzONQtrGRRfkBWHCeX7fjOh7i8zeskg=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/HVP0mBVzL1efzM1m3q3FIoSBjI9EOWaZ7NjZzONQtrGRRfkBWHCeX7fjOh7i8zeskg=w2560-h1440-rw"
            ]
        },
        {
            name: "Meditation Guide",
            description: "Improve mindfulness and reduce stress with guided meditations.",
            icon: "https://cdn-icons-png.flaticon.com/512/3048/3048127.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/CQk2YGH7UD7cZ7nOJZwkufYbY1Frn7KeFmAnIGDF7Eu8BZ_TYJZVVf4HJWLhKvC7CA=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/CQk2YGH7UD7cZ7nOJZwkufYbY1Frn7KeFmAnIGDF7Eu8BZ_TYJZVVf4HJWLhKvC7CA=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/CQk2YGH7UD7cZ7nOJZwkufYbY1Frn7KeFmAnIGDF7Eu8BZ_TYJZVVf4HJWLhKvC7CA=w2560-h1440-rw"
            ]
        }
    ],
    flutter: [
        {
            name: "Virtual Pet Companion",
            description: "Adopt and care for a virtual pet in this interactive app.",
            icon: "https://cdn-icons-png.flaticon.com/512/2385/2385286.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/RV1KkMBt5dlpGopNGz0OsKwNh7UA5dNgBX8yzjhwZ-Wm2GxTGEGWp9P7vNVf0LFWbQ=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/Y7Z9V5ZJXIbGj7PSR_Rvt1MwlGEEz8uQX4qR-2vDww4MDmkPiTlOTnoZbY4bYLHKMg=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/6VPqjlK7ImCaWTELTsqwrIVPb2dX_Vq5Aa-BYF2VuXZqmaiUDJY_Oj8B0ZlVzPw3KA=w2560-h1440-rw"
            ]
        },
        {
            name: "Language Learning Adventure",
            description: "Learn new languages through interactive games and challenges.",
            icon: "https://cdn-icons-png.flaticon.com/512/3898/3898082.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/PAYCwVQ7ew4Qp1T2vTWtYX4xtlOQ-3nT7uYQ4JKHlDmWZLhTWaQwuSJdK-nVxZGdAw=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/5ZKuVcGbCn0L-W8S3xoFHUNjwODLKRCJ8O9mcgQDjIOWQjTIEGxcN5-BNJbTFLXbUQ=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/Ot_1F7Jq6Vx4Jy1Qs6Ux1Nt5ZV3yjzxOc_1RqM9QxRZNmIXUkgqTGj3jFHcuZDHKA=w2560-h1440-rw"
            ]
        },
        {
            name: "Mindfulness Meditation",
            description: "Practice mindfulness and reduce stress with guided meditations.",
            icon: "https://cdn-icons-png.flaticon.com/512/3048/3048377.png",
            screenshots: [
                "https://play-lh.googleusercontent.com/CQk2YGH7nnXQa4nm_WXNHNAGzRvTBqL8mFiGW9KzuGVCJFdYyZi3ZwTlNWAGr6X_Cg=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/cF9rF0uQHh9nRNCzCo8bvJZdq5WxWZ9wFkzrGfGwBHJ-_Z7ByYBQyNWcXEvnmqzZmQ=w2560-h1440-rw",
                "https://play-lh.googleusercontent.com/tX7SZtIz5XnXUXwGcEhzeKBmzR7aVc5_DxhTzRk_-7Cj7cWlPEKOl6C_qoSeS0QZfQ=w2560-h1440-rw"
            ]
        }
    ],
}

function showProjects(technology) {
    const appList = document.getElementById('app-list');
    appList.innerHTML = '';
    apps[technology].forEach(app => {
        const appItem = document.createElement('div');
        appItem.className = 'app-item';
        appItem.innerHTML = `
            <img src="${app.icon}" alt="${app.name}" class="app-icon">
            <div class="app-info">
                <h2 class="app-title">${app.name}</h2>
                <p class="app-description">${app.description}</p>
                <div class="app-rating">
                    <span class="stars">★★★★★</span>
                    <span>${app.rating}</span>
                </div>
                <div class="app-details">
                    <p>Version: ${app.version}</p>
                    <p>Size: ${app.size}</p>
                    <p>Last Updated: ${app.lastUpdated}</p>
                    <p>Downloads: ${app.downloads}</p>
                </div>
                <div class="app-buttons">
                    <a href="${app.playStoreLink}" target="_blank" class="app-button play-store-button">
                        <img src="https://cdn-icons-png.flaticon.com/512/300/300218.png" alt="Play Store" class="button-icon">
                        Play Store
                    </a>
                    <a href="${app.githubLink}" target="_blank" class="app-button github-button">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" class="button-icon" style="filter: invert(1);">
                        GitHub
                    </a>
                </div>
            </div>
        `;
        appItem.onclick = () => {
            showScreenshots(app);
        };
        appList.appendChild(appItem);
    });
}

function showScreenshots(app) {
    const screenshotsContainer = document.getElementById('app-screenshots');
    const screenshotsContent = document.getElementById('screenshots-content');
    screenshotsContent.innerHTML = `
        <h2>${app.name} Screenshots</h2>
        ${app.screenshots.map(screenshot => `<img src="${screenshot}" alt="Screenshot" class="screenshot">`).join('')}
    `;
    screenshotsContainer.style.display = 'flex';
}

function closeScreenshots() {
    document.getElementById('app-screenshots').style.display = 'none';
}
function showAllApps() {
    const appList = document.getElementById('app-list');
    appList.innerHTML = '';
    Object.keys(apps).forEach(technology => {
        apps[technology].forEach(app => {
            const appItem = document.createElement('div');
            appItem.className = 'app-item';
            appItem.innerHTML = `
                <img src="${app.icon}" alt="${app.name}" class="app-icon">
                <div class="app-info">
                    <h2 class="app-title">${app.name}</h2>
                    <p class="app-description">${app.description}</p>
                    <div class="app-rating">
                        <span class="stars">★★★★★</span>
                        <span>${app.rating}</span>
                    </div>
                    <div class="app-details">
                        <p>Version: ${app.version}</p>
                        <p>Size: ${app.size}</p>
                        <p>Last Updated: ${app.lastUpdated}</p>
                        <p>Downloads: ${app.downloads}</p>
                         </div>
                         <div class="app-buttons">
                            <a href="${app.playStoreLink}" target="_blank" class="app-button play-store-button">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store">
                                Play Store
                        </a>
                        <a href="${app.githubLink}" target="_blank" class="app-button github-button">
                            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub">
                        GitHub
                        </a>
                    </div>
            </div>
            `;
            appItem.onclick = () => {
                showScreenshots(app);
            };
            appList.appendChild(appItem);
        });
    });
}
function showScreenshots(app) {
    const screenshotsContainer = document.getElementById('app-screenshots');
    const screenshotsContent = document.getElementById('screenshots-content');
    screenshotsContent.innerHTML = `
            <h2>${app.name} Screenshots</h2>
            ${app.screenshots.map(screenshot => `<img src="${screenshot}" alt="Screenshot" class="screenshot">`).join('')}
        `;
    screenshotsContainer.style.display = 'flex';
}
function closeScreenshots() {
    document.getElementById('app-screenshots').style.display = 'none';
}