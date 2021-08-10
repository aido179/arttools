from typing import List
from string import Template
address = '0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7'
tokenId = '3625'


# Input: a base 16 hex string address (0xabc123) and a base 10 integer string tokenId (123)
# Output: A single binary string representing the concatenated binary of the address and the tokenId
def toBinary(addr: str, id:str) -> str:
    # Convert the values to ints, then to binary, remove the "0b" and concatenate the strings.
    asBinCat = str(bin(int(addr, 16))[2:]) + str(bin(int(id, 10))[2:])
    return asBinCat

# IEEE802 manchester encode a binary string
def manchesterEncode(binary:str) -> str:
    lst = list(binary)
    # IEEE802 defines a 0 as high-low (10) and a 1 as low-high (01).
    encoded_lst = ['10' if x == '0' else '01' for x in lst]
    return ''.join(encoded_lst)

# Split a single string into a list of strings of the given length
def toListOfRows(binary:str, rowLength:int=32) -> List[str]:
    out = []
    while len(binary) > rowLength:
        out.append(binary[:rowLength])
        binary = binary[rowLength:]
    return out

# return a binary string of alternating 1's and 0's
def clock(start='1', length=32):
    sig = '10' if start == '1' else '01'
    return sig*(int(length/2))

# turn a binary string into a string of unicode lines and spaces
def binToDashes(binary:str) -> str:
    bin = binary.replace('0', '\u0020')
    bin = bin.replace('1', '\u2501')
    return bin

# Iterate through a list of binary strings to generate an SVG for laser cutting.
def createSVGString(rows:List[str], width:int=3000, height:int=2000) -> str:
    svg_template = Template(f"""
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
 <g>
  <title>Artwork Rights Token Embedded Encoding</title>
  $content
 </g>
</svg>
    """)
    rect_width = 80
    rect_height = 20
    line_height = 80
    gutter_x = 20
    gutter_y = 20
    curr_x = gutter_x
    curr_y = gutter_y
    curr_shape_index = 0
    content_string = ''
    for row in rows:
        for bit in row:
            if bit == '1':
                # draw bit, inc index
                content_string += f'  <rect id="{curr_shape_index}" height="{rect_height}" width="{rect_width}" y="{curr_y}" x="{curr_x}" stroke="#ff0000" fill="#ffffff"/>\n'
                curr_shape_index += 1
            # new bit, move over x
            curr_x += rect_width
        # new line, reset x, move down y
        curr_y += line_height
        curr_x = gutter_x
    return svg_template.substitute(dict(content=content_string))


bin1 = toBinary(address, tokenId)
bin2 = manchesterEncode(bin1)
rows = [clock(start=0)] + toListOfRows(bin2) + [clock(start=1)]


# print(bin1)
# print()
# print(bin2)
# print()
# print(rows)
# print()
# for row in rows:
#     print(binToDashes(row))

print(createSVGString(rows))
