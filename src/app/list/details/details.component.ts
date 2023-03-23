import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LaptopData } from 'src/app/models/laptop.model';
import { LaptopsService } from 'src/app/services/laptops.service';
import { Position, User } from '../../models/team.model';
import { Brands } from 'src/app/models/team.model';
import { GeneralsService } from 'src/app/services/generals.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  teams: User[] = [];
  positions: Position[] = [];
  brands: Brands[] = [];
  position: string;
  team: string;
  brand: string;
  image: SafeUrl;
  laptopId: number;
  laptop: LaptopData;
  dataLoaded = false;

  constructor(
    private laptopService: LaptopsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private generalsService: GeneralsService
  ) {
    this.laptopId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.subs.push(
      this.generalsService.getAllTeams().subscribe((res) => {
        this.teams = res;
      })
    );

    this.subs.push(
      this.generalsService.getAllBrands().subscribe((res) => {
        this.brands = res;
      })
    );

    this.subs.push(
      this.generalsService.getAllPositions().subscribe((res) => {
        this.positions = res;
        this.subs.push(
          this.laptopService.getLaptopById(this.laptopId).subscribe((res) => {
            this.laptop = res;
            console.log(this.laptop.data.laptop.image);

            this.position = this.positions.find(
              (obj) => obj.id === this.laptop?.data?.user.position_id
            )?.name;

            this.team = this.teams.find(
              (obj) => obj.id === this.laptop?.data?.user.team_id
            )?.name;
            this.brand = this.brands.find(
              (obj) => obj.id === this.laptop?.data?.laptop.brand_id
            )?.name;

            this.dataLoaded = true;
          })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
