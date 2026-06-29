import React from "react"

export function KineticText({
  text,
  as: Tag = "h1",
  className = "",
  style,
  ...rest
}) {
  const mergedStyle = {
    "--hover-padding": "calc(1em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...style,
  }

  return (
    <Tag
      {...rest}
      className={`kinetic-text ${className}`}
      style={mergedStyle}
    >
      {text.split("").map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="kinetic-letter"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  )
}
