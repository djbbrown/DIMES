function compareDatesDesc(a,b) {
       t1 = a.getTime();
       t2 = b.getTime();
       if (t2>t1) return -1;
       else if (t1>t2) return 1
       else return 0;
}
