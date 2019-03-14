import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngxdragdroplists',
  templateUrl: './ngxdragdroplists.component.html',
  styleUrls: ['./ngxdragdroplists.component.css']
})
export class NgxdragdroplistsComponent implements OnInit {

  public simpleList = [
    [
      { name: 'John' },
      { name: 'Smith' },
      { name: 'George' },
    ],
    [
      { name: 'Jennifer' },
      { name: 'Laura' },
      { name: 'Georgina' },
    ]
  ];


  public typedList = [
    [
      { name: 'John', type: 'male' },
      { name: 'Smith', type: 'male' },
      { name: 'George', type: 'male' },
    ],
    [
      { name: 'Jennifer', type: 'female' },
      { name: 'Laura', type: 'female' },
      { name: 'Georgina', type: 'female' },
    ],
    [
      { name: 'Timmy', type: 'male' },
      { name: 'Karen', type: 'female' },
    ]
  ];

  public nestedList = {
    selected: null,
    templates: [
      { type: 'item', id: 2 },
      { type: 'container', id: 1, columns: [[], []] }
    ],
    dropzones: [[
      {
        type: 'container',
        id: 1,
        columns: [
          [
            {
              type: 'item',
              id: '1'
            },
            {
              type: 'item',
              id: '2'
            }
          ],
          [
            {
              type: 'item',
              id: '3'
            }
          ]
        ]
      },
      {
        type: 'item',
        id: '4'
      },
      {
        type: 'item',
        id: '5'
      },
      {
        type: 'item',
        id: '6'
      }
    ],
    [
      {
        type: 'item',
        id: 7
      },
      {
        type: 'item',
        id: '8'
      },
      {
        type: 'container',
        id: '2',
        columns: [
          [
            {
              type: 'item',
              id: '9'
            },
            {
              type: 'item',
              id: '10'
            },
            {
              type: 'item',
              id: '11'
            }
          ],
          [
            {
              type: 'item',
              id: '12'
            },
            {
              type: 'container',
              id: '3',
              columns: [
                [
                  {
                    type: 'item',
                    id: '13'
                  }
                ],
                [
                  {
                    type: 'item',
                    id: '14'
                  }
                ]
              ]
            },
            {
              type: 'item',
              id: '15'
            },
            {
              type: 'item',
              id: '16'
            }
          ]
        ]
      },
      {
        type: 'item',
        id: 16
      }
    ]]
  };

  constructor() { }

  ngOnInit() {
  }

  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }
}
