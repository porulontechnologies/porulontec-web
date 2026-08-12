import os
import re

file_path = 'src/pages/Contact.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix firstName
content = re.sub(
    r'className=\{w-full rounded-xl bg-slate-100/80 dark:bg-\[\#141028\]/80 border  px-3\.5 py-2\.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium\}',
    r'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium}',
    content,
    count=1
)

# Fix lastName
content = re.sub(
    r'className=\{w-full rounded-xl bg-slate-100/80 dark:bg-\[\#141028\]/80 border  px-3\.5 py-2\.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium\}',
    r'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium}',
    content,
    count=1
)

# Fix email
content = re.sub(
    r'className=\{w-full rounded-xl bg-slate-100/80 dark:bg-\[\#141028\]/80 border  px-3\.5 py-2\.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium\}',
    r'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium}',
    content,
    count=1
)

# Fix subject
content = re.sub(
    r'className=\{w-full rounded-xl bg-slate-100/80 dark:bg-\[\#141028\]/80 border  px-3\.5 py-2\.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium\}',
    r'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all font-medium}',
    content,
    count=1
)

# Fix message
content = re.sub(
    r'className=\{w-full rounded-xl bg-slate-100/80 dark:bg-\[\#141028\]/80 border \$\{errors.message \? \'border-red-400 focus:ring-red-500/50 focus:border-red-500\' : \'border-slate-300/80 dark:border-purple-500/20 focus:ring-purple-500/40 focus:border-purple-500\'\} px-3\.5 py-2\.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all resize-none font-medium\}',
    r'className={w-full rounded-xl bg-slate-100/80 dark:bg-[#141028]/80 border  px-3.5 py-2.5 text-text text-xs placeholder:text-text-muted/60 focus:outline-none focus:ring-2 transition-all resize-none font-medium}',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed Contact.jsx')
