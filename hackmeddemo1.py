# -*- coding: utf-8 -*-
"""
Created on Sun Mar 11 01:23:57 2018

@author: eia15hln
"""
def readStopWords(stopfile):
    stops = []
    inf = open(stopfile,'r')
    for line in inf:
        word = line.strip()
        stops.append(word)
    return stops

def countWords(filename,stops):
    counts = {}
    inf = open(filename,'r')
    for line in inf:
        words = line.split()
        for word in words:
            if word not in stops:
                if word in counts:
                    counts[word] += 1
                else:
                    counts[word] = 1
    return counts



def printTop20(counts):
    words = list(counts.keys())
    words.sort(reverse=True,key=lambda v:counts[v])



    for i in range(20):
        word = words[i]
        print(i+1, ':', word, '=', counts[word])
        
def printBuzzwords(counts,filename):
    inf = open(filename, 'r')
    for line in inf:
        keywords = line.split()
        
    for word in counts:
        if word in keywords:
            print(word, '=', counts[word])
   

     

stops = readStopWords('stopwords.txt')
infile =('moby.txt')

#keywords= ['whale', 'captain','money']



#printTop20(moby_counts)
moby_counts = countWords(infile,stops)
printBuzzwords(moby_counts,'buzzword.txt')
