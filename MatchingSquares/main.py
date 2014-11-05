#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os

from google.appengine.ext import ndb
import jinja2
from models import Weatherpic
import webapp2


jinja_env = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
  autoescape=True)

# Generic key used to group Weatherpics into an entity group.
PARENT_KEY = ndb.Key("Entity", 'weatherpic_root')

class WeatherpicsPage(webapp2.RequestHandler):
    def get(self):
        weatherpics_query = Weatherpic.query(ancestor=PARENT_KEY).order(-Weatherpic.last_touch_date_time).fetch()
        template = jinja_env.get_template("templates/weatherpics.html")
        self.response.out.write(template.render({'weatherpics_query': weatherpics_query}))


class InsertWeatherpicAction(webapp2.RequestHandler):
    def post(self):
        if self.request.get("entity_key"):
            weatherpic_key = ndb.Key(urlsafe=self.request.get('entity_key'))
            weatherpic = weatherpic_key.get()
            weatherpic.image_url = self.request.get("image_url")
            weatherpic.caption = self.request.get("caption")
            weatherpic.put()
        else:
            new_weather_pic = Weatherpic(parent=PARENT_KEY,
                                         image_url=self.request.get('image_url'),
                                         caption=self.request.get('caption'))
            new_weather_pic.put()
        self.redirect(self.request.referer)


class DeleteWeatherpicAction(webapp2.RequestHandler):
    def post(self):
        weatherpic_key = ndb.Key(urlsafe=self.request.get('entity_key'))
        weatherpic_key.delete()
        self.redirect(self.request.referer)


app = webapp2.WSGIApplication([
    ("/", WeatherpicsPage),
    ("/insertweatherpic", InsertWeatherpicAction),
    ("/deleteweatherpic", DeleteWeatherpicAction)
], debug=True)



