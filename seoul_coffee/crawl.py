#! /usr/bin/python3
# -*- coding: utf-8 -*-

from lxml import html
import requests


APIKEY = '' # 이 곳에 네이버 API 키를 입력 (http://developer.naver.com/wiki/pages/OpenAPI)
MAPAPI = 'http://openapi.map.naver.com/api/geocode.php?key=%s&encoding=utf-8&coord=LatLng&query=%s'


def get_latlon(query):
    root = html.parse(MAPAPI % (APIKEY, query))
    lon, lat = root.xpath('//point/x/text()')[0], root.xpath('//point/y/text()')[0]
    return (lat, lon)


def prep(item):
    n, name = item[0].split(' ', 1)
    lat, lon = get_latlon(item[3])
    return {
        'num': n, 'name': name,
        'lat': lat, 'lon': lon,
        'description': item[1],
        'phone': item[2],
        'addr': item[3]
    }


# get data from article
r = requests.get('http://m.wikitree.co.kr/main/news_view.php?id=217101')
root = html.document_fromstring(r.text)
string = '\n'.join(root.xpath('//div[@id="ct_size"]/div//text()'))

items = []
for i in range(1, 21):
    tmp = string.split('%s.' % i, 1)
    string = tmp[1]
    items.append([j.strip() for j in tmp[0].split('\n') if j and j!='\xa0'])

data = [prep(i[:4]) for i in items[1:]]


# save data to file
with open('places.csv', 'w') as f:
    f.write('name,lat,lon\n')
    for d in data:
        f.write('%(name)s,%(lat)s,%(lon)s\n' % d)
