// =============================================================================
// Sahil Langoo ATS-Optimized 1-Page Resume Template (Typst DSL)
// Compile with: typst compile template.typ output.pdf
// Standards: Harvard CS 1-Page Model, Google XYZ Impact, CMap Unicode ATS Safe
// =============================================================================

#set page(
  paper: "us-letter",
  margin: (x: 0.38in, top: 0.32in, bottom: 0.32in),
)

#set text(
  font: ("Latin Modern Roman", "Liberation Serif", "Times New Roman"),
  size: 8.8pt,
  lang: "en",
)

#set par(
  justify: true,
  leading: 0.42em,
)

// Section Heading Macro
#let section(title) = {
  v(2.5pt)
  text(weight: "bold", size: 9.8pt, smallcaps(title))
  v(-3.5pt)
  line(length: 100%, stroke: 0.45pt + black)
  v(1pt)
}

// Experience / Subheading Macro
#let entry(title, location, subtitle, dates, bullets) = {
  block(width: 100%, breakable: false)[
    #grid(
      columns: (1fr, auto),
      text(weight: "bold", size: 9.1pt)[#title],
      text(weight: "bold", size: 8.8pt)[#location],
    )
    #v(-2pt)
    #grid(
      columns: (1fr, auto),
      text(style: "italic", size: 8.6pt)[#subtitle],
      text(style: "italic", size: 8.6pt)[#dates],
    )
    #v(-3pt)
    #for b in bullets [
      #v(1.2pt)
      #grid(
        columns: (8pt, 1fr),
        [•],
        [#text(size: 8.6pt)[#b]]
      )
    ]
  ]
}

// Project Entry Macro
#let project(title, tech, dates, bullets, url: none) = {
  block(width: 100%, breakable: false)[
    #grid(
      columns: (1fr, auto),
      [
        #text(weight: "bold", size: 9.1pt)[#title]
        #text(style: "italic", size: 8.4pt)[ | #tech]
        #if url != none [
          #text(size: 8.2pt)[ (#link(url)[#url.replace("https://", "")]) ]
        ]
      ],
      text(style: "italic", size: 8.6pt)[#dates],
    )
    #v(-3pt)
    #for b in bullets [
      #v(1.2pt)
      #grid(
        columns: (8pt, 1fr),
        [•],
        [#text(size: 8.6pt)[#b]]
      )
    ]
  ]
}
