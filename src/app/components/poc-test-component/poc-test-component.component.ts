import { Component, ViewContainerRef } from '@angular/core';
import { HeaderContentComponent } from '../header-content/header-content.component';
import {
  ButtonModule,
  CodeSnippetModule,
  ContainedListModule,
  ContentSwitcherModule,
  ContentSwitcherOption,
  FileUploaderModule,
  IconModule,
  InputModule,
  NFormsModule,
  NotificationService,
  SnippetType,
  StructuredListModule,
  TagModule,
  TimePickerModule,
  TimePickerSelectModule,
  GridListViewModule,
} from 'ui-components-lib';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { read } from 'xlsx';

@Component({
  selector: 'app-poc-test-component',
  standalone: true,
  imports: [
    HeaderContentComponent,
    TagModule,
    InputModule,
    IconModule,
    ButtonModule,
    NFormsModule,
    ContentSwitcherModule,
    ContainedListModule,
    StructuredListModule,
    CommonModule,
    CodeSnippetModule,
    FileUploaderModule,
    TimePickerModule,
    TimePickerSelectModule,
    GridListViewModule,
  ],
  templateUrl: './poc-test-component.component.html',
  styleUrl: './poc-test-component.component.scss',
})
export class PocTestComponentComponent {
item2: any[]= [
  {
    content: 'one',
  },
  {
    content: 'two',
  }
];
values: any;
object: any;
  uploadedFiles: File[];
  fileContents: never[];
  timePickerSelectChange($event: any) {
    throw new Error('Method not implemented.');
  }
  jsonContent: any;
  TimeValue: any;
  period: any;
  timeZone: any;
  constructor(
    private router: Router,
    private dataService: DataService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(){
    this.object=this.UsersDetails
  }
  selectedOption = 'User';
  code: any;
  multi: SnippetType.multi;
  accept: any[];
  files: any;


  users: any = [];

  breadcrumps = [
    {
      content: 'Users',
      href: 'users',
    },
    {
      content: 'OtherComponents',
    },
  ];
  buttonNgClass: {
    'example-global-class': true;
  };

availableItems:any=[ 
	{
		content: "Reda",
		type:'red'
	},
	{
		content: "Mohamed",
	},
	{
		content: "Riad",
		type:'cyan'
	}
]
  tags: any;
  details: any = [];
  UsersDetails = [
    {
      content: 'Reda',
      job: 'Full stack developer',
      desc: 'Computer engineer passionate about development',
      url:'assets/images/dev.jpg'
    },
    {
      content: 'Mohamed',
      job: 'Mechanic',
      desc: 'car mechanic passionate about engine and race',
      url:'assets/images/m.jpg'
    },
    {
      content: 'Riad',
      job: 'CEO',
      desc: 'Experienced CEO with strong expertise in strategic leadership',
      url:'assets/images/ceo.jpg'
    }, {
      content: 'User 4',
      job: 'Data Scientist',
      desc: 'Computer engineer passionate about development',
      url:'assets/images/dev.jpg'
    },
    {
      content: 'User 5',
      job: 'Mechanic',
      desc: 'car mechanic passionate about engine and race',
      url:'assets/images/m.jpg'
    },
    {
      content: 'User 6',
      job: 'CEO',
      desc: 'Experienced CEO with strong expertise in strategic leadership',
      url:'assets/images/ceo.jpg'
    }, {
      content: 'User 7',
      job: 'Full stack developer',
      desc: 'Computer engineer passionate about development',
      url:'assets/images/dev.jpg'
    },
    {
      content: 'User 8',
      job: 'Mechanic',
      desc: 'car mechanic passionate about engine and race',
      url:'assets/images/m.jpg'
    },
    {
      content: 'User 9',
      job: 'CEO',
      desc: 'Experienced CEO with strong expertise in strategic leadership',
      url:'assets/images/ceo.jpg'
    }, {
      content: 'User 10',
      job: 'Full stack developer',
      desc: 'Computer engineer passionate about development',
      url:'assets/images/dev.jpg'
    },
    {
      content: 'User 11',
      job: 'Mechanic',
      desc: 'car mechanic passionate about engine and race',
      url:'assets/images/m.jpg'
    },
    {
      content: 'User 12',
      job: 'CEO',
      desc: 'Experienced CEO with strong expertise in strategic leadership',
      url:'assets/images/ceo.jpg'
    },
  ];

  onClick($event: any) {
    this.users = $event;
  }

  ItemClick(_t24: any) {
    let userDetail: any = this.UsersDetails.find(
      (user) => user.content === _t24.text
    );
    if (
      !this.details.some((detail: any) => detail.content === userDetail.content)
    ) {
      this.details.push(userDetail);
    }
  }
  refresh() {
    this.users = [];
    this.details = [];
    this.TimeValue='';
  }
  onDelete(userA: any) {
    this.users = this.users.filter((user: any) => user.text !== userA.text);
    this.details = this.details.filter(
      (user: any) => user.content !== userA.text
    );
    this.tags = this.tags.filter(
      (user: any) => user.text !== userA.text
    );
  }

  selected($event: ContentSwitcherOption) {
    this.selectedOption = $event.name;
  }

  onUpload() {
    this.files.forEach((fileItem: any) => {
      if (!fileItem.uploaded) {
        if (fileItem.file.size < 500000) {
          fileItem.state = 'upload';

          const currentDate = new Date();
          const hours = Number(
            currentDate.getHours().toString().padStart(2, '0')
          );
          const minutes = currentDate.getMinutes().toString().padStart(2, '0');
          const reader = new FileReader();

          reader.onload = (event: any) => {
            try {
              const parsedContent = JSON.parse(event.target.result);
              setTimeout(() => {
                this.jsonContent = JSON.stringify(parsedContent, null, 2);
                this.TimeValue = `${hours % 12 || 12}:${minutes}`;
                this.period = hours >= 12 ? 'PM' : 'AM';
                this.timeZone = 'Time Zone 1'; //
              }, 1500);

              console.log('Parsed JSON:', this.jsonContent);
            } catch (error) {
              console.error('Error parsing JSON:', error);
              this.jsonContent = 'Invalid JSON file.';
            }
          };

          reader.onerror = (error) => {
            console.error('Error reading file:', error);
          };

          reader.readAsText(fileItem.file);

          setTimeout(() => {
            fileItem.state = 'complete';
            fileItem.uploaded = true;
          }, 1500);
        } else {
          fileItem.state = 'upload';
          setTimeout(() => {
            fileItem.state = 'edit';
            fileItem.invalid = true;
            fileItem.invalidText = 'File size exceeds limit';
          }, 1500);
        }
      }
    });
  }


  //   onUpload() {
  //   this.onFilesSelected(this.files);
  //   this.files.forEach((fileItem: any) => {
  //     if (!fileItem.uploaded) {
  //       if (fileItem.file.size < 500000) {
  //         this.code = fileItem;
  //         console.log(this.code);
  //         fileItem.state = 'upload';
  //         setTimeout(() => {
  //           fileItem.state = 'complete';
  //           fileItem.uploaded = true;
  //         }, 1500);
  //       }

  //       if (fileItem.file.size > 500000) {
  //         fileItem.state = 'upload';
  //         setTimeout(() => {
  //           fileItem.state = 'edit';
  //           fileItem.invalid = true;
  //           fileItem.invalidText = 'File size exceeds limit';
  //         }, 1500);
  //       }
  //     }
  //   });
  // }
  // onFilesSelected(files: File[]) {
  //   this.uploadedFiles = files;
  //   this.fileContents = [];

  //   for (const file of this.uploadedFiles) {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       console.log(e);
  //       // this.fileContents.push(e.target.result);
  //     };

  //     reader.onerror = (error) => {
  //       console.error('Error reading file:', error);
  //     };

  //     //   reader.readAsText(file);
  //     console.log(reader); // You can use other methods like readAsDataURL, readAsArrayBuffer, etc.
  //   }
  // }

  
}
