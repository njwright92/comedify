import requests

# List of subreddits to scrape
subreddits = ['comedy', 'Jokes', 'StandUpComedy', 'Standup']

# Loop through each subreddit
for subreddit in subreddits:
    print(f"Fetching top posts from /r/{subreddit}...")

    # Construct the API URL
    url = f"https://www.reddit.com/r/{subreddit}/top.json?limit=10"

    # Fetch the JSON data
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})

    if response.status_code == 200:
        posts = response.json()['data']['children']
    for i, post in enumerate(posts):
        data = post['data']
        print(f"{i+1}. Title: {data['title']}")
        print(f"   Joke: {data['selftext']}")
else:
    print(f"Failed to get data from /r/{subreddit}")

print("------")
