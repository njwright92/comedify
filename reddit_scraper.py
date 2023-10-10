import requests

# List of subreddits to scrape
subreddits = ['comedy', 'Jokes', 'StandUpComedy', 'Standup']

# Open the file in write mode
with open("reddit_comedy_data.txt", "w") as file:
    # Loop through each subreddit
    for subreddit in subreddits:
        file.write(f"Fetching top posts from /r/{subreddit}...\n")

        # Construct the API URL
        url = f"https://www.reddit.com/r/{subreddit}/top.json?limit=10"

        # Fetch the JSON data
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})

        if response.status_code == 200:
            posts = response.json()['data']['children']
            for i, post in enumerate(posts):
                data = post['data']
                file.write(f"{i+1}. Title: {data['title']}\n")
                file.write(f"   Joke: {data['selftext']}\n")
        else:
            file.write(f"Failed to get data from /r/{subreddit}\n")

        file.write("------\n")
