import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Folder, FolderNode } from './folder';
import { Stack } from 'src/app/util/data-structures/stack';
import { UtilService } from 'src/app/util/services/util.service';
import { LayoutService } from './layout.service';
import { RootName } from './layout.data';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [LayoutService]
})
export class LayoutComponent implements OnInit {

  readonly RootName = RootName;
  public masterDirectory: Folder;
  public currentFolder: FolderNode;
  private folderStack: Stack<FolderNode>;
  public folderAdditionInProgress: boolean = false;
  public newFolderNameValue: string;
  @ViewChild('newFolderNameInput') private newFolderNameInput: ElementRef;

  @HostListener('keydown', ['$event'])
  handleKeyDownEvent(kevent: KeyboardEvent) {
    if (this.folderAdditionInProgress) {
      if (kevent.keyCode == 27) {
        kevent.preventDefault();
        this.toggleNewFolderDialog(); // Closing dialog on esc
      }
    }
  }

  constructor(private utilServ: UtilService, private layoutServ: LayoutService) { }

  ngOnInit() {
    this.initiateDefaults();
    this.fetchMasterDirectory();
  }

  /**
     * @description initiate default values
     */
  private initiateDefaults() {
    try {
      this.currentFolder = null;
      this.folderStack = new Stack<FolderNode>();
      this.masterDirectory = null;
      this.folderAdditionInProgress = false;
      this.newFolderNameValue = "";
    } catch (error) {
      this.utilServ.raiseException('initiating the default values', error);
    }
  }

  /**
   * @description fetch the master directory
   */
  private fetchMasterDirectory() {
    this.layoutServ.getInitialDirectory().subscribe(data => {
      this.masterDirectory = data;
      this.initializeLayout();
    })
  }

  /**
   * @description initialize the layout
   */
  private initializeLayout() {
    this.navigateFolder('init');
  }

  /**
   * @description navigate folder controls
   * @param direction the folder in which the menu is intended to move
   * @param menu the folder to navigate to
   */
  public navigateFolder(direction: 'init' | 'fwd' | 'bwd', folder?: Folder) {
    try {
      switch (direction) {
        case 'bwd':
          if (this.currentFolder.previous) { // If folder has previous
            this.popFromStack();
          }
          break;
        case 'init':
        case 'fwd':
          this.pushOntoStack(folder);
          break;
        default:
          break;
      }
      this.updateCurrentFolder();
      this.utilServ.scrollToTopOfWindow();
    } catch (error) {
      this.utilServ.raiseException('navigating folder ' + direction, error);
    }
  }

  /**
   * @description update the current folder from top of stack
   */
  private updateCurrentFolder() {
    try {
      this.currentFolder = this.folderStack.peek();
    } catch (error) {
      this.utilServ.raiseException('setting current folder', error);
    }
  }

  /**
   * @description form new folder node
   * @param folder the new folder to form
   */
  private formNewFolderNode(folder?: Folder): FolderNode {
    try {
      let _newNode: FolderNode = new FolderNode();
      if (folder) { // contents
        _newNode.data = folder;
        _newNode.previous = this.formPreviousFolderData();
      } else { // Root folder
        _newNode.data = this.formRootFolderData();
      }

      return _newNode;
    } catch (error) {
      this.utilServ.raiseException('forming new folder node', error);
    }
  }

  /**
   * @description form the root folder information
   */
  private formRootFolderData(): Folder {
    try {
      return this.masterDirectory;
    } catch (error) {
      this.utilServ.raiseException('forming root folder data', error);
    }
  }

  /**
   * @description form the previous folder data from the top of the stack
   */
  private formPreviousFolderData(): Folder {
    try {
      let _previousFolder: Folder = new Folder();
      let _topOfStack: FolderNode = this.folderStack.peek();
      if (_topOfStack) {
        _previousFolder.name = _topOfStack.data.name;
      }

      return _previousFolder;
    } catch (error) {
      this.utilServ.raiseException('forming previous folder data', error);
    }
  }

  /**
   * @description push folder onto stack
   * @param folder the folder to be pushed onto stack
   */
  private pushOntoStack(folder?: Folder) {
    try {
      this.folderStack.push(this.formNewFolderNode(folder));
    } catch (error) {
      this.utilServ.raiseException('pushing onto stack', error);
    }
  }

  /**
   * @description pop top from stack
   */
  private popFromStack() {
    try {
      if (this.folderStack) {
        this.folderStack.pop();
      }
    } catch (error) {
      this.utilServ.raiseException('popping top from stack', error);
    }
  }

  /**
   * @description add a new folder
   * @param folderName the name of the new folder
   */
  public addFolder(folderName: string) {
    try {
      if (folderName && folderName.trim() && !this.checkIfFolderAlreadyExists(folderName)) {
        folderName = folderName.trim();
        if (this.currentFolder) {
          if (!this.currentFolder.data.contents) {
            this.currentFolder.data.contents = [];
          }
          this.currentFolder.data.contents.push({ name: folderName });
          this.toggleNewFolderDialog();
        }
      }
    } catch (error) {
      this.utilServ.raiseException('adding folder', error);
    }
  }

  /**
   * @description focus on the new folder input
   */
  private focusOnNewFolderInput() {
    setTimeout(() => {
      if (this.newFolderNameInput && this.newFolderNameInput.nativeElement) {
        this.newFolderNameInput.nativeElement.focus();
      }
    }, 100);
  }

  /**
   * @description toggle the new folder dialog
   */
  public toggleNewFolderDialog() {
    this.focusOnNewFolderInput();
    this.folderAdditionInProgress = !this.folderAdditionInProgress;
    this.newFolderNameValue = "";
  }

  /**
   * @description check if a folder name already exists in the current folder
   * @param folderName the folder name to check in current folder
   */
  public checkIfFolderAlreadyExists(folderName: string): boolean {
    try {
      if (folderName && this.currentFolder.data.contents) {
        if (this.currentFolder.data.contents.map(data => data.name.toLowerCase()).includes(folderName.trim().toLowerCase())) {
          return true;
        }
      }
      return false;
    } catch (error) {
      this.utilServ.raiseException('checking if folder already exists', error);
    }
  }

}
