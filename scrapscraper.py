import requests
from bs4 import BeautifulSoup
import re
import csv

# List of comedians to search for
comedians = [
    "Bill Burr", "Dave Chappelle", "Patrice O'Neal", "Mark Normand",
    "George Lopez", "Whitney Cummings", "Bert Kreischer", "Paul Virzi",
    "George Carlin", "Andrew 'Dice' Clay", "Richard Pryor",
    "Louis CK", "Chris Rock", "Adam Sandler", "Joe Rogan"
]


def fetch_transcripts():
    with open('comedy_transcripts.csv', 'w', newline='') as csvfile:
        fieldnames = ['tokens', 'tags']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for comedian in comedians:
            print(f"Searching for stand-up specials by {comedian}...")
            url = "https://scrapsfromtheloft.com/stand-up-comedy-scripts/"
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})

            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                articles = soup.find_all('article')

                for article in articles:
                    h2_tag = article.find('h2')
                    if h2_tag:
                        title = h2_tag.get_text()
                        if re.search(comedian, title, re.IGNORECASE):
                            link = article.find('a')['href']
                            print(
                                f"Found special for {comedian}: {title} - {link}")

                            # Fetch the transcript text
                            transcript_response = requests.get(
                                link, headers={'User-Agent': 'Mozilla/5.0'})
                            transcript_soup = BeautifulSoup(
                                transcript_response.text, 'html.parser')

                            transcript_div = transcript_soup.find(
                                'div', {'class': 'post-content'})
                            if transcript_div:
                                transcript_text = transcript_div.get_text()
                                writer.writerow(
                                    {'tokens': transcript_text, 'tags': comedian})
            else:
                print(f"Failed to get data for {comedian}")


if __name__ == "__main__":
    fetch_transcripts()
