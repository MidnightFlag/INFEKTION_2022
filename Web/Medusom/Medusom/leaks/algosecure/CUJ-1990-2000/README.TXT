The C/C++ Users Journal CD-ROM, Release 4 
January 1990 - December 2000
***********************************************************************
This CD-ROM contains articles and listings that appeared in the C/C++
Users Journal in the January 1990 through December 2000 issues. It also
contains extra source code contributed by the authors, which was not
published in the magazine due to space constraints, and web-exclusive 
articles.

The material on this CD-ROM is copyright (c) 2000, CMP Media Inc.
unless otherwise noted. Any articles not appearing in this archive are
absent due to restrictions on rights of publication requested by the
author. CMP Media does not hold a copyright to the source code
contained in the source code archive. This code is either freely
available for use, or copyrighted by the author. In the latter case a
copyright notice will appear in the source code along with restrictions
(if any) on its use.

File Formats
************************************************************************
This CD is designed to be viewed on a web browser. All article text
(including referenced listings) is in HTML format. The full source code
archive is ASCII text stored in zip format. All graphics files are in
GIF or JPEG formats.

CD-ROM File Structure
************************************************************************
The CD contains three major subdirectories, html, search, and source.
The Html subdirectory contains the article text. The search subdirectory
contains the search engine. The source subdirectory contains the full
source code archive, organized by year/month/author. When viewed through
a browser, the CD provides a frame-based button at the top of every page
that allows access to the source archive. The source archive can also be
accessed through the file system, independently of the browser.

System requirements
************************************************************************
- CD-ROM drive

- Web browser: for best results use Netscape Navigator 4.0 or higher; or
  Internet Explorer 4.0 or higher. The web browser must be Java-enabled 
  to run the search engine.

- Memory: 16 MB minimum, 32 MB recommended.

- Operating System: you must have a 32-bit operating system installed to
  run the search engine.

Installation
************************************************************************
- Windows: install the CD on the CD-ROM drive. There is no installation
  procedure.

- Unix: install the CD on the CD-ROM drive. Use the mount procedure 
  specified by your system.

- Linux: install the CD on the CD-ROM drive. Type:

  mount /<DEVICE PATH>/<MOUNT POINT>

  i.e., mount /mnt/cdrom or mount /cdrom

  where <DEVICE PATH> and <MOUNT POINT> are the device path and
  mount points, respectively, defined for your system.


To Start the CUJ CD-ROM:
************************************************************************
- Windows: use the Open File option (under the File menu) of your web 
  browser and open the file <X>:start.htm, where <X> is the drive letter
  of your CD-ROM drive.

- Unix/Linux: use the Open File option (under the File menu) of your 
  web browser and open the file <MOUNT PATH>/start.htm, where 
  <MOUNT PATH> is the mount path defined for the CD-ROM on your system.


To Search the CD
************************************************************************
The CD includes a Java-based search engine. To access the search engine
click on the frame-based button marked "Search" that appears at the
top of every page.


Miscellaneous Problems & Troubleshooting Information
************************************************************************
"Missing" Articles

The CUJ CD contains approximately 95% of the articles that were printed
from January 1990 through December 2000. The percentage of missing articles
is highest for the first two years (1990 & 1991) and generally decreases
for later volumes. If an article does not appear on the CD, it is
because we could not obtain permission from the authors to put it on the
CD.


Links Don’t Work in Unix/Linux

This is probably a failure to *mount* the CD on the Unix system
correctly. On some Unix systems the user must issue a mount command
before using the CD. Follow the mounting instructions provided on the CD
jewel box. We have a list of additional mount commands that have been
tried on various versions of Unix. We can fax or email you this 
document (cdmount.txt) upon request.


Search Engine Doesn’t Work

Possible causes:

-- using an old or incompatible browser. The search engine requires
Netscape 4.0 or Internet Explorer 4.0 or later.

-- browser not Java-enabled. Netscape and Internet Explorer browsers
have options for enabling and disabling Java. Make sure the browser’s
option is set for Java enabled.

-- not enough memory -- 16 MB minimum recommended. Try shutting down
other applications if your system has small memory capacity.

-- CLASSPATH environment variable. Some browsers do not work correctly
when the CLASSPATH environment variable has been defined. On Windows
systems the place where the CLASSPATH variable is typically defined is
in the autoexec.bat file, which executes upon bootup. To undefine the
CLASSPATH variable, remove or comment out all lines in autoexec.bat that
begin:

  set CLASSPATH= ...

On Windows systems you can turn such a line into a comment by prefacing
it with the "rem" keyword.

  rem set CLASSPATH= ...

After undefining the CLASSPATH, reboot your system.

-- Netscape 4.06 and 4.5 running on some OEM versions of Windows 95B do 
not appear to interpret the Java code implementing the search engine 
correctly. If you have problems with the search engine using these 
versions of the Netscape browser, we recommend that you switch to an 
earlier version or use a different browser.

-- browser not compatible with operating system. We cannot possibly test
every browser/operating system combination. If all else fails you might
try a different browser. (Browsers can be downloaded for free from the
Internet.)








Contact Information
************************************************************************
C/C++ Users Journal
CMP Media Inc.
1601 W. 23rd, St., Ste. 200
Lawrence, KS 66046
email: cujed@cmp.com
Fax: 1-785-841-2047
Web: www.cuj.com
