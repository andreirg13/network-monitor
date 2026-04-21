import os
from dotenv import load_dotenv
from anthropic import Anthropic
import json


load_dotenv()
client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

def analyze_packets(packets):
    
    packet_string = json.dumps(packets, indent=2)
    prompt = f"""
    You are an expert network analyst.
    You have been provided with a list of network packets in JSON format. Each packet contains information about the source IP, destination IP, protocol, bytes transferred, and timestamp.
    {packet_string}
    Analyze these packets and provide insights on potential security threats, unusual patterns, or any other noteworthy observations. Focus on identifying any anomalies or suspicious activities that could indicate a security issue.
    And categorize the packets in three categories: green, yellow, and red.
    The output format should be ONLY a JSON object with the following structure:
    -"threat_level: "green", "yellow", or "red"
    -suspicious_ips: a list of IP addresses that are considered suspicious
    -reason: plain english explanation of why packets are categorized as they are.
    -recommended actions: what should be done
    """

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        system="You are a cybersecurity analyst analyzing network traffic for potential threats and overall network health.",
        messages = [{"role": "user", "content": prompt}]
        )
    return response.content[0].text

    