#!/bin/bash
echo "Mengkompilasi LaTeX UBSI..."
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex
echo "Selesai! Silakan buka main.pdf"
