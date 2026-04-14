import random
import datetime

def generate_traffic():
    packet = {
        "source_ip" : f"{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}",
        "destination_ip" : f"{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(0,255)}",
        "protocol" : random.choice(["HTTP", "HTTPS", "TCP", "UDP"]),
        "bytes" : random.randint(500,5000),
        "timestamp" : datetime.datetime.now().strftime("%H:%M:%S")
    }

    return packet
