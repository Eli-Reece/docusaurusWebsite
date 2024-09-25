
2024-08-04 03:09

Status: #teen

Tags: [[version control]] [[Linux]]

# SVN

## Checkout
- `svn checkout` creates a working copy in directory
```bash
svn checkout http://svn.repo.local.com/repo/blahblah
svn co http://svn.repo.local.com/repo/blahblah
```
## Update
- Update repositories using `svn update`
```bash
svn update
svn up
```
## Branching / Tagging
- branch using `svn copy`
```bash
svn copy http://svn.repo.local.com/repo/src/trunk http://svn.repo.local.com/repo/src/branches/<branch-name> -m "<Branch Message>"

svn cp http://svn.repo.local.com/repo/src/trunk http://svn.repo.local.com/repo/src/branches/<branch-name> -m "<Branch Message>"
```
## Adding
- Use `svn add \<filepath>` to add files to version control
```bash
svn add <filepath>
```
## Deleting
- Use 'svn delete \<filepath>' to remove files from version control and local file system
```bash
svn delete <filepath>
svn rm <filepath>
```
## Status
- Check current status of working copy files using `svn status`
```bash
svn status <opt filepath>
svn stat
svn st
```
- ? item:
The file, directory, or symbolic link item is not under version control.

- A item:
The file, directory, or symbolic link item has been scheduled for addition into the repository.

- C item:
The file item is in a state of conflict. That is, changes received from the server during an update overlap with local changes that you have in your working copy (and weren't resolved during the update). You must resolve this conflict before committing your changes to the repository.

- D item:
The file, directory, or symbolic link item has been scheduled for deletion from the repository.

- M item:
The contents of the file item have been modified.
## Diff
- `svn diff` will display differences in file content
```bash
svn diff
svn di
```
## Revert
- Use `svn revert` to undo any scheduled operation (svn status)
```bash
svn add file.txt
svn revert file.txt
```
## Committing
- `svn commit`
```bash
svn commit -m "commit message"
svn commit -F <logfile>
```
## Externs/Properties
- Use `svn proplist` to list that names of properties that exist on that path
- You can use `svn propedit` to edit those properties in your editor
```bash
[admin@demo repo]$ svn pl
Properties on '.':
  svn:externals
[admin@demo repo]$ svn pe svn:externals --editor-cmd micro .
No changes to property 'svn:externals' on '.'
[admin@demo repo]$
```
### Extern example
```bash
^/software/modules/driver/i2c/trunk@400 i2c
^/software/modules/driver/can/branches/can3@1505 can
```
- @\<rev> for an optional rev specification
- After editing properties you can use `svn up` to see changes
	- May need to delete the previous extern'd dir to see changes
## Locking
- Use `svn lock` to place a lock on a file for exclusive editing rights.
- Lock comments are optional but should be done
```bash
svn lock file.txt -m "Editing share file"
```
- After committing the changes the lock token/lock will be released from the working copy
- `svn status -u` and `svn info` can provide more context on locks made
### Helpful Aliases
```bash
alias svnst='svn st'
alias svnup='svn up'
alias svnco='svn co'
alias svnlog='svn log'
alias svninfo='svn info'
alias svnpe='svn pe svn:externals --editor-cmd micro .'
alias svndiff='svn diff -r PREV:HEAD | less'
```
# References
- https://svnbook.red-bean.com/