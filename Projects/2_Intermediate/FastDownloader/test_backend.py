#!/usr/bin/env python3
"""
Test script to verify backend functionality
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_health():
    """Test if backend is running"""
    print("🔍 Testing backend health...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Backend is running!")
            print(f"   Status: {data.get('status')}")
            print(f"   Backend: {data.get('backend')}")
            return True
        else:
            print(f"❌ Backend returned status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend not reachable: {e}")
        print("   Make sure to run: python server.py")
        return False

def test_info(url):
    """Test video info fetching"""
    print(f"\n🔍 Testing info fetch for: {url}")
    try:
        response = requests.post(
            f"{BASE_URL}/api/info",
            json={"url": url},
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Info fetched successfully!")
            print(f"   Title: {data.get('title')}")
            print(f"   Uploader: {data.get('uploader')}")
            print(f"   Duration: {data.get('duration')} seconds")
            return True
        else:
            error = response.json()
            print(f"❌ Error: {error.get('error')}")
            return False
    except Exception as e:
        print(f"❌ Request failed: {e}")
        return False

def test_download(url, audio_only=False):
    """Test video download"""
    print(f"\n⬇️  Testing download for: {url}")
    print(f"   Audio only: {audio_only}")
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/download",
            json={
                "url": url,
                "audioOnly": audio_only,
                "playlist": False
            },
            timeout=120
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Download successful!")
            print(f"   Title: {data.get('title')}")
            print(f"   Filename: {data.get('filename')}")
            print(f"   Size: {data.get('size')} bytes")
            print(f"   Download URL: {BASE_URL}{data.get('download_url')}")
            return True
        else:
            error = response.json()
            print(f"❌ Error: {error.get('error')}")
            return False
    except Exception as e:
        print(f"❌ Request failed: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("🧪 Universal Media Downloader - Backend Test")
    print("=" * 60)
    
    # Test 1: Health check
    if not test_health():
        print("\n❌ Backend is not running. Start it with: python server.py")
        exit(1)
    
    # Test 2: Info fetch (using a short public domain video)
    test_url = "https://www.youtube.com/watch?v=jNQXAC9IVRw"  # "Me at the zoo" - first YouTube video
    test_info(test_url)
    
    # Test 3: Download
    print("\n" + "=" * 60)
    print("Would you like to test actual download? (y/n)")
    choice = input("> ").lower()
    
    if choice == 'y':
        test_download(test_url, audio_only=False)
    
    print("\n" + "=" * 60)
    print("✅ Testing complete!")
    print("=" * 60)
