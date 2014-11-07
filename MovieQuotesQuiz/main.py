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
import json
import logging
import os
import random

from google.appengine.ext import ndb
import jinja2
import webapp2

import import_data
from models import MovieQuote


jinja_env = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
  autoescape=True)

# Generic key used to group MovieQuotes into an entity group.
PARENT_KEY = ndb.Key("Entity", 'moviequote_root')

class MovieQuotesPage(webapp2.RequestHandler):
    def get(self):
        moviequotes_query = MovieQuote.query(ancestor=PARENT_KEY).order(-MovieQuote.last_touch_date_time)
        template = jinja_env.get_template("templates/moviequotes.html")
        self.response.out.write(template.render({"moviequotes_query": moviequotes_query}))

class InsertQuoteAction(webapp2.RequestHandler):
    def post(self):
        if self.request.get("entity_key"):
            moviequote_key = ndb.Key(urlsafe=self.request.get('entity_key'))
            moviequote = moviequote_key.get()
            moviequote.quote = self.request.get("quote")
            moviequote.movie = self.request.get("movie")
            moviequote.put()
        else:
            new_quote = MovieQuote(parent=PARENT_KEY,
                                   quote=self.request.get("quote"),
                                   movie=self.request.get("movie"))
            new_quote.put()
            
        # TODO: Use json response instead if api=json
        
        self.redirect(self.request.referer) # Only do this is NOT using AJAX!

class DeleteQuoteAction(webapp2.RequestHandler):
    def post(self):
        moviequote_key = ndb.Key(urlsafe=self.request.get('entity_key'))
        moviequote_key.delete()
        self.redirect(self.request.referer)

def build_question_list(num_questions):
    moviequotes = MovieQuote.query(ancestor=PARENT_KEY).order(-MovieQuote.last_touch_date_time).fetch(200)
    unique_movie_titles = []
    for moviequote in moviequotes:
        if moviequote.movie not in unique_movie_titles:
            unique_movie_titles.append(moviequote.movie)
    random_moviequotes = random.sample(moviequotes, num_questions)
    question_list = []
    for moviequote in random_moviequotes:
        incorrects = random.sample(unique_movie_titles, 4)
        if moviequote.movie in incorrects:
            incorrects.remove(moviequote.movie)
        else:
            incorrects = incorrects[:3]
        question_list.append({"quote": moviequote.quote,
                              "movie": moviequote.movie,
                              "incorrects": incorrects})
            
class GetQuizQuestions(webapp2.RequestHandler):
    def get(self):
        self.response.headers["Content-Type"] = "application/json"

        # TODO: Implement by making use of the build_question_list function

        
app = webapp2.WSGIApplication([
    ("/", MovieQuotesPage),
    ("/insertquote", InsertQuoteAction),
    ("/deletequote", DeleteQuoteAction),
    # TODO: Add path for quiz questions
    # TODO: Add path for import data
], debug=True)



