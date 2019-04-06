import { Injectable } from '@angular/core'

import { IssueObject } from '@models/issues/issue.interface'
import { IssueModel } from '@models/issues/issue.model'
import { IssueQuery } from '@models/issues-feed/issues-feed.interface';
import { IssuesFeed } from '@models/issues-feed/issues-feed.model';
import { Api } from '@providers/api/api.service'


@Injectable()
export class IssueService {

  endpoint: string = 'issues'
  limit: number = 10

  constructor(public api: Api) { }

  // fetch all issues and build a list of IssueModel instances
  query(issuesFeed?: IssuesFeed) {

    let params = {limit: this.limit, offset: 0}
    if (issuesFeed && issuesFeed.next)
      params.offset = issuesFeed.list.length      
    
    return this.api.get<IssueQuery>(this.endpoint, params)
  }

  // save a new issue from the IssueModel instance
  add(issue: IssueModel) {
    return this.api.post<IssueObject>(this.endpoint, issue.create)
  }

  // fetch an issue object
  get(id: Number) {
    return this.api.get<IssueObject>(this.endpoint + '/' + id)
  }

}
